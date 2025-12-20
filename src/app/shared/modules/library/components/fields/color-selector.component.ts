import {
	ChangeDetectionStrategy,
	Component,
	input,
	model,
	output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
	selector: 'app-color-selector',
	host: { class: 'flex justify-center items-center gap-4 mb-2' },
	template: `
		<mat-form-field class="flex-1" (keyup.enter)="changed.emit(value())">
			<mat-label>{{ label() }}</mat-label>

			<input matInput type="text" [disabled]="disabled()" [(ngModel)]="value" />

			<mat-hint class="text-xs flex flex-col">
				Appuyer sur Entrée pour valider <br />
				<span class="text-gray-400 mt-1">
					- Format hexadécimal (ex: #FF5733)
				</span>
			</mat-hint>
		</mat-form-field>

		<span
			class="block mb-auto mt-3 rounded-full size-10"
			[style]="'background-color:' + value()"></span>
	`,
	imports: [MatFormField, MatLabel, MatInput, MatHint, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent implements FormValueControl<string> {
	readonly value = model('');
	readonly disabled = input(false);
	readonly label = input('Sélectionner une couleur');

	readonly changed = output<string>();
}
