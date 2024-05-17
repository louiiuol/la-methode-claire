import {UpperCasePipe} from '@angular/common';
import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FileUploadComponent} from '@shared/components/form/file_upload/file-upload.component';

import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {take} from 'rxjs';

import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';

@Component({
	standalone: true,
	selector: 'app-course-edit',
	imports: [
		UpperCasePipe,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatDivider,
		FileUploadComponent,
		MatExpansionModule,
		MatDialogClose,
	],
	providers: [LibraryAdminService],
	templateUrl: 'course-edit.dialog.html',
})
export class CourseEditDialog implements OnInit {
	@HostBinding('class') class = '!block px-4 pb-2';

	protected readonly editCourse$ = this.libraryService.editCourse;
	protected color = this.course.color;

	constructor(
		@Inject(MAT_DIALOG_DATA) public course: CourseViewDto,
		private readonly libraryService: LibraryAdminService
	) {}

	ngOnInit(): void {}

	updateColor() {
		this.libraryService
			.editCourse(this.course.uuid, {color: this.color})
			.pipe(take(1))
			.subscribe();
	}

	addSound() {
		throw new Error('Method not implemented.');
	}

	removeSound(sound: string) {
		this.libraryService
			.removeSound(this.course.uuid, sound)
			.pipe(take(1))
			.subscribe(
				() => (this.course.sounds = this.course.sounds?.filter(s => s != sound))
			);
	}
}
