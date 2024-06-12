import {UpperCasePipe} from '@angular/common';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {MatDialog, MatDialogClose} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FileUploadComponent} from '@shared/modules/library/components/file-upload/file-upload.component';

import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {take} from 'rxjs';

import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';
import {PosterCreateDialog} from '../poster-create/poster-create.dialog';
import {PhonemeViewDto} from '../../types/phoneme-view.dto';
import {PhonemeEditComponent} from '../phoneme-edit/phoneme-edit.component';
import {addOrReplace} from '@core/helpers/fn/add-or-replace.fn';
import {MatButton} from '@angular/material/button';

@Component({
	standalone: true,
	selector: 'app-course-edit',
	imports: [
		UpperCasePipe,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButton,
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

	editPhoneme(phoneme?: PhonemeViewDto) {
		this.dialog
			.open(PhonemeEditComponent, {
				data: {
					courseUuid: this.course.uuid,
					...phoneme,
				},
			})
			.afterClosed()
			.subscribe(phoneme => {
				if (phoneme) {
					this.course.phonemes = addOrReplace(
						this.course.phonemes,
						phoneme,
						'uuid'
					);
				}
			});
	}

	removePhoneme(phoneme: string) {
		if (confirm('Êtes vous sûr de vouloir supprimer ce graphème ? '))
			this.libraryService
				.removePhoneme(this.course.uuid, phoneme)
				.pipe(take(1))
				.subscribe(
					() =>
						(this.course.phonemes = this.course.phonemes?.filter(
							s => s.name != phoneme
						))
				);
	}

	addSound() {
		this.dialog
			.open(PosterCreateDialog, {
				data: {courseUuid: this.course.uuid, type: 'sounds'},
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

	addPoster() {
		this.dialog
			.open(PosterCreateDialog, {
				data: {courseUuid: this.course.uuid, type: 'posters'},
			})
			.afterClosed()
			.subscribe(poster => {
				if (poster) {
					this.course.posterNames ??= [];
					this.course.posterNames.push(poster);
				}
			});
	}

	removePoster(poster: string | undefined) {
		this.libraryService
			.deletePoster(this.course.uuid, poster)
			.pipe(take(1))
			.subscribe(
				() =>
					(this.course.posterNames = this.course.posterNames?.filter(
						s => s != poster
					))
			);
	}
}
