import {
	Component,
	Input,
	model,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LibraryAdminService } from 'src/app/views/admin-view/services/library.service';

@Component({
	selector: 'app-file-upload',
	imports: [
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressBarModule,
	],
	host: { class: 'flex items-center gap-2 p-2' },
	providers: [LibraryAdminService],
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent {
	@Input({ required: true }) fieldName!: { value: string; viewValue: string };
	@Input({ required: true }) courseUuid!: string;
	readonly fileExist = model(false);

	protected readonly currentFile = signal(<File | undefined>undefined);
	protected fileName = 'Ajouter un pdf';

	constructor(private libraryService: LibraryAdminService) {}

	selectFile(event: any): void {
		console.log(event);
		if (event?.target?.files?.[0]) {
			const file: File = event.target.files[0];
			this.currentFile.set(file);
			this.fileName = this.currentFile.name;
		} else {
			this.fileName = 'Select File';
		}
	}

	deleteFile() {
		this.libraryService
			.deleteFile(this.courseUuid, this.fieldName.value)
			.subscribe(() => {
				this.fileExist.set(false);
				this.currentFile.set(undefined);
			});
	}

	upload(): void {
		console.log(this.currentFile);

		const currentFile = this.currentFile();

		if (!currentFile) {
			return;
		}

		const formData: FormData = new FormData();
		formData.append(this.fieldName.value, currentFile);
		this.libraryService.editCourse(this.courseUuid, formData).subscribe({
			next: () => {
				this.fileExist.set(true);
			},
			error: (err: any) => {
				console.log(err);
			},
			complete: () => {
				this.currentFile.set(undefined);
			},
		});
	}
}
