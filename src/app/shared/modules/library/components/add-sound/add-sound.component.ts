import {HttpEventType, HttpResponse} from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Inject,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';

@Component({
	selector: 'app-add-sound',
	standalone: true,
	imports: [
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatDialogClose,
		MatDivider,
		MatIcon,
		MatButton,
	],
	providers: [LibraryAdminService],
	templateUrl: './add-sound.component.html',
	styleUrls: ['../file-upload/file-upload.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSoundComponent {
	@HostBinding('class') class = '!block px-6 py-3';
	protected currentFile?: File;
	protected progress = 0;
	protected message = '';
	protected fileName = 'Ajouter un pdf';
	protected sound = '';
	constructor(
		@Inject(MAT_DIALOG_DATA) protected data: {courseUuid: string},
		private uploadService: LibraryAdminService
	) {}

	selectFile(event: any): void {
		this.progress = 0;
		this.message = '';

		if (event.target.files?.[0]) {
			const file: File = event.target.files[0];
			this.currentFile = file;
			this.fileName = this.currentFile.name;
		} else {
			this.fileName = 'Select File';
		}
	}

	upload(): void {
		if (this.currentFile) {
			const formData: FormData = new FormData();
			formData.append('file', this.currentFile);
			formData.append('name', this.sound);
			this.uploadService
				.upload(this.data.courseUuid, formData, 'sounds', 'POST')
				.subscribe({
					next: (event: any) => {
						if (event.type === HttpEventType.UploadProgress) {
							this.progress = Math.round((100 * event.loaded) / event.total);
						} else if (event instanceof HttpResponse) {
							this.message = event.body.message;
						}
					},
					error: (err: any) => {
						console.log(err);
						this.progress = 0;
						this.message = err.error?.message ?? 'Could not upload the file!';
					},
					complete: () => {
						this.currentFile = undefined;
					},
				});
		}
	}
}
