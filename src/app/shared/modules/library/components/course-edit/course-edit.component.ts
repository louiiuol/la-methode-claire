import {UpperCasePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, model} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FileUploadComponent} from '@shared/modules/library/components/file-upload/file-upload.component';

import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {take} from 'rxjs';

import {MatButton} from '@angular/material/button';
import {addOrReplace} from '@core/helpers/fn/add-or-replace.fn';
import {LibraryAdminService} from 'src/app/views/admin-view/services/library.service';
import {PhonemeViewDto} from '../../types/phoneme-view.dto';
import {PhonemeEditComponent} from '../phoneme-edit/phoneme-edit.component';
import {PosterCreateDialog} from '../poster-create/poster-create.dialog';

@Component({
	selector: 'app-course-edit',
	host: {class: 'block px-4 pb-2'},
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
		ReactiveFormsModule,
	],
	providers: [LibraryAdminService],
	templateUrl: 'course-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent {
	readonly course = model.required<CourseViewDto>();

	private readonly library = inject(LibraryAdminService);
	private readonly dialog = inject(MatDialog);

	//protected readonly editCourse$ = this.library.editCourse;

	protected readonly soundFormGroup = new FormGroup({
		name: new FormControl(''),
		file: new FormControl(null),
	});

	updateColor() {
		const course = this.course();
		this.library
			.editCourse(course.uuid, {color: course.color})
			.pipe(take(1))
			.subscribe();
	}

	editPhoneme(phoneme?: PhonemeViewDto) {
		this.dialog
			.open(PhonemeEditComponent, {
				disableClose: true,
				data: {
					courseUuid: this.course().uuid,
					...phoneme,
				},
			})
			.afterClosed()
			.pipe(take(1))
			.subscribe(phoneme => {
				if (phoneme) {
					this.course().phonemes = addOrReplace(
						this.course().phonemes,
						phoneme,
						'uuid'
					);
				}
			});
	}

	removePhoneme(phoneme: string) {
		if (confirm('Êtes vous sûr de vouloir supprimer ce graphème ? '))
			this.library
				.removePhoneme(this.course().uuid, phoneme)
				.pipe(take(1))
				.subscribe(
					() =>
						(this.course().phonemes = this.course().phonemes?.filter(
							s => s.name != phoneme
						))
				);
	}

	addSound() {
		this.dialog
			.open(PosterCreateDialog, {
				data: {courseUuid: this.course().uuid, type: 'sounds'},
			})
			.afterClosed()
			.subscribe(sound => {
				if (sound) {
					const course = this.course();
					course.sounds ??= [];
					course.sounds.push(sound);
					this.course.set(course);
				}
			});
	}

	removeSound(sound: string) {
		this.library
			.removeSound(this.course().uuid, sound)
			.pipe(take(1))
			.subscribe(
				() =>
					(this.course().sounds = this.course().sounds?.filter(s => s != sound))
			);
	}

	addPoster() {
		this.dialog
			.open(PosterCreateDialog, {
				data: {courseUuid: this.course().uuid, type: 'posters'},
			})
			.afterClosed()
			.pipe(take(1))
			.subscribe(poster => {
				if (poster) {
					const course = this.course();
					course.posterNames ??= [];
					course.posterNames.push(poster);
					this.course.set(course);
				}
			});
	}

	removePoster(poster: string | undefined) {
		this.library
			.deletePoster(this.course().uuid, poster)
			.pipe(take(1))
			.subscribe(
				() =>
					(this.course().posterNames = this.course().posterNames?.filter(
						s => s != poster
					))
			);
	}
}
