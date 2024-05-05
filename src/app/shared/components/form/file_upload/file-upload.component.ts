import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '@shared/modules/library/services/file-upload.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';

@Component({
	standalone: true,
	selector: 'app-file-upload',
	imports: [
		AsyncPipe,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressBarModule,
	],
	providers: [LibraryAdminService],
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent implements OnInit {
	@Input({required: true}) fieldName!: {value: string; viewValue: string};
	@Input({required: true}) courseUuid!: string;
	@Input({required: true}) type!: 'phonemes' | 'sounds' | 'files';
	@Input() fileExist = false;

	sound?: string;

	currentFile?: File;
	progress = 0;
	message = '';

	fileName = 'Ajouter un pdf';

	constructor(private uploadService: LibraryAdminService) {}

	ngOnInit(): void {}

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

	deleteFile() {
		this.uploadService
			.deleteFile(this.courseUuid, this.fieldName.value)
			.subscribe(() => (this.fileExist = false));
	}

	upload(): void {
		if (this.currentFile) {
			this.uploadService
				.upload(
					this.courseUuid,
					this.currentFile,
					this.fieldName.value,
					this.type
				)
				.subscribe({
					next: (event: any) => {
						if (event.type === HttpEventType.UploadProgress) {
							this.progress = Math.round((100 * event.loaded) / event.total);
						} else if (event instanceof HttpResponse) {
							this.message = event.body.message;
							this.fileExist = true;
						}
					},
					error: (err: any) => {
						console.log(err);
						this.progress = 0;

						if (err.error?.message) {
							this.message = err.error.message;
						} else {
							this.message = 'Could not upload the file!';
						}
					},
					complete: () => {
						this.currentFile = undefined;
					},
				});
		}
	}
}
