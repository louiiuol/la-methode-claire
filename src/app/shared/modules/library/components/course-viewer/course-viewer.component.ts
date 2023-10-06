import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
const MaterialModules = [
	MatChipsModule,
	MatSidenavModule,
	MatListModule,
	MatRadioModule,
];

import {take} from 'rxjs';

import {AuthService, isBoolean} from '@core';
import {TrustUrlPipe} from '@shared/pipes';
import {
	ButtonComponent,
	CardComponent,
	IconComponent,
	FileViewerComponent,
	MessageComponent,
} from '@shared/components';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {TranslatePipe} from '@core/modules/translation/pipes/translate.pipe';

/**
 * Display lesson details, including phonemes, words and files for the given `Course`
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [
		NgIf,
		NgFor,
		TrustUrlPipe,
		...MaterialModules,
		ButtonComponent,
		IconComponent,
		CardComponent,
		FileViewerComponent,
		MessageComponent,
		TranslatePipe,
	],
	selector: 'app-course-viewer',
	templateUrl: './course-viewer.component.html',
})
export class CourseViewerComponent {
	/**
	 * Defines current course to be shown. Depending on which course is given,
	 * this method will populate `filesAvailable` field with given course's files.
	 */
	@Input({required: true}) set course(course: CourseViewDto | undefined) {
		if (course) {
			course.phonemes.sort((a, b) => a.name.localeCompare(b.name));
			this._course = course;
			this.filesAvailable = [];
			for (let prop in course)
				if (isBoolean(course[prop]) && !!course[prop])
					this.filesAvailable.push(prop);
			this.phonemePosters =
				this.course?.phonemes?.filter(p => p.poster).map(p => p.name) ?? [];
		}
	}

	get course(): CourseViewDto | undefined {
		return this._course;
	}

	/**
	 * Defines current lesson' index for user. This property will be used to check if user
	 * has already seen this course or not.
	 */
	@Input({required: true}) currentLessonIndex!: number;

	/**
	 * Emits next Course index, this allows to move up to the next lesson from the parent component.
	 */
	@Output() nextLesson = new EventEmitter();

	@HostBinding('class')
	protected readonly class = 'flex-1 bg-accent';

	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.hasValidSubscription;

	protected currentUserLesson =
		this.authenticator?.currentUser()?.currentLesson ?? 0;

	protected filesAvailable: string[] = [];

	protected phonemePosters: string[] = [];

	private _course?: CourseViewDto;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}

	setCurrentLesson(index: number) {
		this.library
			.setCurrentLesson(index)
			.pipe(take(1))
			.subscribe(res => {
				if (!res.error) {
					this.currentLessonIndex = index;
					this.currentUserLesson = index;
					this.nextLesson.emit(index);
					this.authenticator.updateCurrentUser({currentLesson: index});
				}
			});
	}
}
