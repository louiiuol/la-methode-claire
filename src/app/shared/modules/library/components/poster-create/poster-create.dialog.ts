import {HttpEventType, HttpResponse} from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Inject,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogClose,
	MatDialogRef,
} from '@angular/material/dialog';
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
	templateUrl: './poster-create.dialog.html',
	styleUrls: ['../file-upload/file-upload.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosterCreateDialog {
	@HostBinding('class') class = '!block px-6 py-3';

	protected currentFile?: File;
	protected fileName = 'Ajouter un pdf';
	protected name = '';

	constructor(
		@Inject(MAT_DIALOG_DATA)
		protected data: {courseUuid: string; type: 'sounds' | 'posters'},
		private uploadService: LibraryAdminService,
		private readonly dialogRef: MatDialogRef<PosterCreateDialog>
	) {}

	selectFile(event: any): void {
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
			formData.append('name', this.name);
			const action = this.isPoster()
				? this.uploadService.createPoster(this.data.courseUuid, formData)
				: this.uploadService.createSound(this.data.courseUuid, formData);
			action.subscribe(() => {
				this.currentFile = undefined;
				this.dialogRef.close(this.name);
			});
		}
	}

	isPoster = () => this.data.type == 'posters';
}
