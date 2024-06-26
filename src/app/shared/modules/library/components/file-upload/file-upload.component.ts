import {Component, Input, ViewEncapsulation} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
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
export class FileUploadComponent {
	@Input({required: true}) fieldName!: {value: string; viewValue: string};
	@Input({required: true}) courseUuid!: string;
	@Input() fileExist = false;

	protected currentFile?: File;
	protected fileName = 'Ajouter un pdf';

	constructor(private libraryService: LibraryAdminService) {}

	selectFile(event: any): void {
		if (event.target.files?.[0]) {
			const file: File = event.target.files[0];
			this.currentFile = file;
			this.fileName = this.currentFile.name;
		} else {
			this.fileName = 'Select File';
		}
	}

	deleteFile() {
		this.libraryService
			.deleteFile(this.courseUuid, this.fieldName.value)
			.subscribe(() => {
				this.fileExist = false;
				this.currentFile = undefined;
			});
	}

	upload(): void {
		console.log(this.currentFile);

		if (this.currentFile) {
			const formData: FormData = new FormData();
			formData.append(this.fieldName.value, this.currentFile);
			this.libraryService.editCourse(this.courseUuid, formData).subscribe({
				next: () => {
					this.fileExist = true;
				},
				error: (err: any) => {
					console.log(err);
				},
				complete: () => {
					this.currentFile = undefined;
				},
			});
		}
	}
}
