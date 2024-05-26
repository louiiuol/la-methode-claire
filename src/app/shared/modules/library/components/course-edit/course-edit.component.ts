import {UpperCasePipe} from '@angular/common';
import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogClose,
} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ButtonComponent} from '@shared/components';
import {FileUploadComponent} from '@shared/modules/library/components/file-upload/file-upload.component';

import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {take} from 'rxjs';

import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';
import {AddSoundComponent} from '../add-sound/add-sound.component';

@Component({
	standalone: true,
	selector: 'app-course-edit',
	imports: [
		UpperCasePipe,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ButtonComponent,
		MatIconModule,
		MatDivider,
		FileUploadComponent,
		MatExpansionModule,
		MatDialogClose,
		ReactiveFormsModule,
	],
	providers: [LibraryAdminService],
	templateUrl: 'course-edit.component.html',
})
export class CourseEditComponent implements OnInit {
	@HostBinding('class') class = '!block px-4 pb-2';

	@Input({required: true}) course!: CourseViewDto;

	protected readonly editCourse$ = this.libraryService.editCourse;

	soundFormGroup = new FormGroup({
		name: new FormControl(''),
		file: new FormControl(null),
	});

	constructor(
		private readonly libraryService: LibraryAdminService,
		private readonly dialog: MatDialog
	) {}

	ngOnInit(): void {}

	updateColor() {
		this.libraryService
			.editCourse(this.course.uuid, {color: this.course.color})
			.pipe(take(1))
			.subscribe();
	}

	addSound() {
		this.dialog
			.open(AddSoundComponent, {
				data: {courseUuid: this.course.uuid},
			})
			.afterClosed()
			.subscribe(sound => {
				if (sound) {
					this.course.sounds ??= [];
					this.course.sounds.push(sound);
				}
			});
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
