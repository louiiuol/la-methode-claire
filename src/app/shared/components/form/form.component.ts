import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LoaderComponent, MessageComponent} from '@shared/components';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {Observable} from 'rxjs';

import {
	APP_FORM_VALIDATORS,
	FieldConfig,
	FormModule,
	APP_FORM_GROUPS,
	takeUntilDestroyed,
} from '@core';
import {MatButton} from '@angular/material/button';

/**
 * Standalone component used to create HTML form which will be translated and errors that
 * could occurs will be handle internally. This way, developers will have a minimal
 * boilerplate to write while still inherit all features provided by the component.
 *
 * In order to use this component, you must follow these steps:
 * 1. Create you own component (associated with mat card for example)
 * 2. Define a local array of {@link GroupConfig} (read Interface documentation for usage)
 * 3. Define a local method to be called by this form (when submitting value).
 * This method return an Observable
 * 4. Finally, add this snippets to your HTML (replace values with your own)
 *
 * - component.html
 * @example
 * <app-form
 *  action="login"
 *  [submitted]="logIn"
 *  [group]="group" />
 *
 * See @inputs documentation for more information on usage.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [
		FormModule,
		LoaderComponent,
		MatButton,
		MatTooltipModule,
		MatProgressBarModule,
		MessageComponent,
	],
	selector: 'app-form',
	templateUrl: './form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
	/**
	 * Request to perform when the form is submitted.
	 * This must be a method that emit a http request and
	 * returns result an observable
	 *
	 * You should use a method provided by a service that
	 * extends {@link HttpResource} for optimal behavior.
	 */
	@Input({required: true, alias: 'submitted'}) submitted$!: (
		...args: any[]
	) => Observable<any>;

	@Input() forceReset = false;

	/**
	 * Groups defining fields to be injected. You can pick fields that you need
	 * from {@link appFormGroups}. If no field match you need you add your own,
	 * please follow dedicated documentation in that case.
	 */
	@Input({required: true}) set fields(fields: FieldConfig[]) {
		this.formFields = fields.map(field => this.buildField(field));
		this.ref.detectChanges();
	}

	/**
	 * Adds customs validators. must match one of the {@link APP_FORM_VALIDATORS}.
	 */
	@Input() set validators(validators: string[]) {
		if (validators?.length) {
			this.formFields = [
				{
					validators: {
						validation:
							validators?.map(validator =>
								APP_FORM_VALIDATORS.find(v => v.name === validator)
							) ?? [],
					},
					fieldGroup: this.formFields,
				},
			];
			this.ref.detectChanges();
		}
	}

	/**
	 * Name of the action to be displayed. (default is submit)
	 *
	 * The given key must exists translation files: 'core.actions.{key}'
	 */
	@Input() action = 'envoyer';

	@Input() askConfirmation = false;
	@Input() confirmationMessage =
		'Êtes vous sûr de vouloir soumettre ce formulaire ? Cette action est irréversible';

	@Input() resettable = true;
	/**
	 * Model of the form, could be useful to perform side actions.
	 *
	 * Allows to define initial value for the form and keep track of it after user changed form.
	 */
	@Input() set model(model: any) {
		const newValue = model ?? {};
		this.formModel = structuredClone(newValue);
		this._initialModel = structuredClone(newValue);
	}
	get model() {
		return this.formModel;
	}

	@Output() sent = new EventEmitter();

	protected options: FormlyFormOptions = {
		formState: {disabled: false},
	};
	protected form: FormGroup = new FormGroup({});
	protected formModel: any;
	protected formFields?: FormlyFieldConfig<any>[];
	protected isLoading = false;
	protected errorMessages: string[] = [];

	private untilDestroyed$ = takeUntilDestroyed();
	private _initialModel: any;

	constructor(private ref: ChangeDetectorRef) {}

	/**
	 * If no model is given, will init form with empty object
	 */
	ngOnInit(): void {
		if (!this.model) this.model = {};
	}

	/**
	 * Submit given request (with 'submitted' input)
	 */
	onSubmit(model: any): void {
		if (this.askConfirmation ? confirm(this.confirmationMessage) : true)
			this.load(this.submitted$(model), (res: any) => {
				let valid = false;
				if (res?.error) {
					this.errorMessages = this.generateMessage(res.error);
					// TODO add handle if error is typeof APIFormDetailsError..
					// this.reset();
				} else {
					if (this.forceReset) this.reset();
					valid = true;
					this._initialModel = structuredClone(this.model);
				}
				this.sent.emit(valid);
			});
	}

	/**
	 * Reset current model with the initial one
	 */
	reset = () =>
		(this.model = this._initialModel && this.form.markAsUntouched());

	/**
	 * Checks if current form is in 'pristine' state
	 */
	pristine = () =>
		JSON.stringify(this._initialModel) === JSON.stringify(this.formModel);

	isValidForm = () => (this.form.valid && !this.pristine()) || this.pristine();

	// private format = ({error}: HttpOutput<null>) => {
	// 	if (!error) return [];
	// 	return typeof error === 'string'
	// 		? [this.generateMessage(error)]
	// 		: error.map(error => this.checkErrorIsString(error));
	// };

	// private checkErrorIsString = (error: string | object) =>
	// 	typeof error === 'string' ? this.generateMessage(error) : null;

	private buildField = (field?: FieldConfig): FormlyFieldConfig => {
		if (!field) return {};
		const [resource, presetName] = field.preset?.split('.') ?? [];
		const preset =
			resource && presetName ? this.getPreset(resource, presetName) : {};
		return {
			...preset,
			...field,
			type:
				field.type ??
				preset.type ??
				(!field.props?.hidden ? 'input' : undefined),
			key: field.key ?? preset.key,
			props: Object.assign(preset?.props ?? {}, field.props),
			validation: [],
			validators: {validation: field.validators ?? preset.validators ?? []},
			expressions: {
				'props.disabled': 'formState.disabled',
			},
		};
	};

	private generateMessage = (summary: string | string[]) =>
		Array.isArray(summary) ? summary : [summary];

	private load(obs: Observable<any>, fn: any) {
		this.toggleDisabled();
		this.isLoading = true;
		return obs.pipe(this.untilDestroyed$).subscribe(res => {
			fn(res);
			this.toggleDisabled();
			this.isLoading = false;
			this.ref.detectChanges();
		});
	}

	private toggleDisabled() {
		this.options.formState.disabled = !this.options.formState.disabled;
	}

	private getPreset(resource: string, name: string) {
		return APP_FORM_GROUPS[resource]?.find(f => f.key === name) ?? {};
	}
}
