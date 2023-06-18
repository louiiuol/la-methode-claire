import {NgModule} from '@angular/core';
import {
	ConfigOption,
	FORMLY_CONFIG,
	FormlyFieldConfig,
	FormlyModule,
} from '@ngx-formly/core';
import {TranslateService as NgxTranslateService} from '@ngx-translate/core';
import {getName} from './models/patterns';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {TranslateModule} from '../translation/translate.module';
import {CommonModule} from '@angular/common';
/**
 * Overrides Formly Validation config in order to display validation messages translated to customer
 * These messages need to be declared in translation files at `core.form.validation.{name}` with {name} equal to validation's name
 *
 * @internal
 * @param translate Service used to translate messages
 * @returns translated validationMessages
 */
export function formlyValidationConfig(
	translate: NgxTranslateService
): ConfigOption {
	return {
		validators: [{name: 'passwordMatch', validation: passwordMatchValidator}],
		validationMessages: [
			{
				name: 'required',
				message() {
					return translate.stream('core.form.validation.required');
				},
			},
			{
				name: 'email',
				message() {
					return translate.instant('core.form.validation.email');
				},
			},
			{
				name: 'minLength',
				message(field: FormlyFieldConfig) {
					return translate.instant('core.form.validation.minLength', {
						min: (field as any).requiredLength,
						actual: (field as any).actualLength,
					});
				},
			},
			{
				name: 'maxLength',
				message(field: FormlyFieldConfig) {
					return translate.instant('core.form.validation.maxLength', {
						max: (field as any).requiredLength,
						actual: (field as any).actualLength,
					});
				},
			},
			{
				name: 'max',
				message(field: FormlyFieldConfig) {
					return translate.instant('core.form.validation.max', {
						max: (field as any).max,
					});
				},
			},
			{
				name: 'min',
				message(field: FormlyFieldConfig) {
					return translate.instant('core.form.validation.min', {
						min: (field as any).min,
					});
				},
			},
			{
				name: 'pattern',
				message(field: any) {
					return translate.instant('core.form.validation.pattern', {
						format: translate.instant(
							'core.form.patterns.' + getName(field.requiredPattern)
						),
					});
				},
			},
			{
				name: 'passwordMatch',
				message() {
					return translate.instant(
						'core.form.validation.password_not_matching'
					);
				},
			},
		],
	};
}

const appearance: MatFormFieldDefaultOptions = {
	appearance: 'outline',
};

export function passwordMatchValidator(control: AbstractControl) {
	if (control.value) {
		const {password, passwordConfirm} = control.value;

		// avoid displaying the message error when values are empty
		if (!passwordConfirm || !password || passwordConfirm === password) {
			return null;
		}
	}
	return {passwordMatch: false};
}

/**
 * Provides modules and config used to simplify form creation and management.
 *
 * All form of this application are made with `ReactiveFormsModule` (check out angular documentation for more information about this module)
 * combined with `FormlyModule`. This makes it easy to create translated forms with error management and translation integrated !
 *
 * For usage, please check `FormComponent` documentation.
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	imports: [
		ReactiveFormsModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule,
		TranslateModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		FormlyModule,
		FormlyMaterialModule,
		TranslateModule,
	],
	providers: [
		{
			provide: FORMLY_CONFIG,
			multi: true,
			useFactory: formlyValidationConfig,
			deps: [NgxTranslateService],
		},
	],
})
export class FormModule {}
