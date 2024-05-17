import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FileUploadComponent} from '@shared/components/form/file_upload/file-upload.component';

@Component({
	selector: 'app-add-sound',
	standalone: true,
	imports: [MatFormFieldModule, FileUploadComponent],
	template: `
		<mat-form-field>
			<mat-label>Input</mat-label>
			<input matInput />
		</mat-form-field>
		<app-file-upload />
	`,
	styles: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSoundComponent {}
