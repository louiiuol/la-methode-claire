import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ButtonComponent, IconComponent} from '@shared/components/elements';
import {SearchRules} from './types/search-rules';
import {SearchField} from './types/search-field';
import {MatSelectModule} from '@angular/material/select';
import {nullish} from '@core';

@Component({
	standalone: true,
	selector: 'app-input-search',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		ButtonComponent,
		IconComponent,
	],
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent implements OnInit {
	@Input({required: true}) isLoading = true;
	@Input() fields?: SearchField[];

	@Input() defaultField?: SearchField;
	@Input() initialValue?: string;
	@Input() rule: SearchRules = 'like';

	@Output() searchEvent = new EventEmitter<{searchValue: string | nullish}>();

	@HostBinding('class') class = 'shadow-sm';

	searchRequest: string | nullish;

	protected searchValue = this.initialValue;
	protected searchFieldActive?: SearchField;

	ngOnInit(): void {
		const activeField = this.defaultField ?? this.fields?.at(0);
		if (activeField) this.searchFieldActive = {...activeField};
	}

	setValues(filter: string | nullish) {
		if (filter) {
			const params = filter?.split(':');
			this.searchFieldActive = this.fields?.find(f => f.value == params?.at(0));
			this.searchValue = params?.at(2);
		} else {
			this.searchFieldActive = this.defaultField ?? this.fields?.at(0);
			this.searchValue = '';
		}
	}

	setActiveField = (field: SearchField) => {
		if (field.value != this.searchFieldActive?.value) {
			this.searchFieldActive = {...field};
			this.notify();
		}
	};

	notify = () => {
		const request =
			this.searchFieldActive && this.searchValue
				? `${this.searchFieldActive.value}:${this.rule}:${this.searchValue}`
				: null;
		this.searchRequest = request;
		this.searchEvent.emit({
			searchValue: request,
		});
	};
}
