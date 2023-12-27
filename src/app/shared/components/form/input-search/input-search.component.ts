import {NgIf} from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ButtonComponent, IconComponent} from '@shared/components/elements';

@Component({
	standalone: true,
	selector: 'app-input-search',
	imports: [
		NgIf,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		ButtonComponent,
		IconComponent,
	],
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
	@Input() isLoading = true;
	@Input() label = '';
	@Input() initialSearchValue = '';

	@Output() searchEvent = new EventEmitter<string>();

	searchValue = this.initialSearchValue;
}
