import {NgFor, NgIf} from '@angular/common';
import {
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

@Component({
	standalone: true,
	selector: 'app-input-search',
	imports: [
		NgIf,
		NgFor,
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
})
export class InputSearchComponent implements OnInit {
	@Input() isLoading = true;

	@Input() value: string | null = '';
	@Input() rule: SearchRules = 'like';
	@Input({required: true}) fields!: SearchField[];

	@Output() searchEvent = new EventEmitter<{searchValue: string}>();

	@HostBinding('class') class = 'shadow-sm';
	searchValue = this.value;
	searchFieldActive?: SearchField;
	searchRequest?: string;

	ngOnInit(): void {
		const activeField = this.fields.at(0);
		if (activeField) this.searchFieldActive = {...activeField};
	}

	setActiveField = (field: SearchField) => {
		if (field.value != this.searchFieldActive?.value) {
			console.log('yo ? ', this.searchFieldActive?.value);

			this.searchFieldActive = {...field};
			this.notify();
		}
	};

	notify = () => {
		if (this.searchFieldActive && this.searchValue) {
			const request = `${this.searchFieldActive.value}:${this.rule}:${this.searchValue}`;
			this.searchRequest = request;
			this.searchEvent.emit({
				searchValue: request,
			});
		}
	};
}
