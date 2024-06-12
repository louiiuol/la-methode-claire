import {HttpEventType, HttpResponse} from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Inject,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatChipsModule, MatChipInputEvent} from '@angular/material/chips';
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

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatCheckbox} from '@angular/material/checkbox';

export interface PhonemeEditDto {
	courseUuid: string;
	uuid?: string;
	name?: string;
	poster?: boolean | File;
	endOfWord?: boolean;
	sounds?: string[];
	info?: string;
}
@Component({
	selector: 'app-add-phoneme',
	standalone: true,
	imports: [
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatDialogClose,
		MatDivider,
		MatIcon,
		MatButton,
		MatChipsModule,
		MatCheckbox,
	],
	providers: [LibraryAdminService],
	templateUrl: './phoneme-edit.component.html',
	styleUrls: ['../file-upload/file-upload.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonemeEditComponent {
	@HostBinding('class') class = '!block px-6 py-3 w-96';
	protected currentFile?: File;

	constructor(
		@Inject(MAT_DIALOG_DATA) protected data: PhonemeEditDto,
		private libraryService: LibraryAdminService,
		private readonly dialogRef: MatDialogRef<PhonemeEditComponent>
	) {}

	get title() {
		return `${this.data.uuid ? 'édition' : 'Ajout'} d'un graphème`;
	}
	get action() {
		return this.data.uuid ? 'éditer' : 'ajouter';
	}

	selectFile(event: any): void {
		if (event.target.files?.[0]) {
			const file: File = event.target.files[0];
			this.currentFile = file;
		}
	}

	submit(): void {
		const formData: FormData = new FormData();
		// if (this.data.name) formData.append('name', this.data.name);
		// formData.append('endOfWord', String(!!this.data.endOfWord));
		// if (typeof this.data.sounds == 'string')
		// 	this.data.sounds = [this.data.sounds];
		// if (this.data.sounds)
		// 	this.data.sounds.forEach(s => formData.append('sounds[]', s));
		// if (this.currentFile) formData.append('poster', this.currentFile);
		// if (this.data.info) formData.append('info', this.data.info);
		this.data.poster = this.currentFile;
		const action = this.data.uuid
			? this.libraryService.editPhoneme(
					this.data.courseUuid,
					this.data.uuid,
					this.data
				)
			: this.libraryService.createPhoneme(this.data.courseUuid, this.data);

		action.subscribe(res => {
			const result = res.value;
			if (result) {
				this.data.poster = this.currentFile;
				this.currentFile = undefined;
				this.dialogRef.close(result);
			}
		});
	}

	deletePoster() {
		this.libraryService
			.deletePhonemePoster(this.data.courseUuid, this.data.name)
			.subscribe(() => (this.data.poster = undefined));
	}

	readonly separatorKeysCodes = [ENTER, COMMA] as const;

	addSound(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
			this.data.sounds ??= [];
			this.data.sounds.push(value);
		}

		// Clear the input value
		event.chipInput.clear();
	}

	removeSound(fruit: string): void {
		this.data.sounds ??= [];
		const index = this.data.sounds.indexOf(fruit);
		if (index >= 0) this.data.sounds?.splice(index, 1);
	}
}
