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

import {AuthService, TranslateModule, isBoolean} from '@core';
import {TrustUrlPipe} from '@shared/pipes';
import {
	ButtonComponent,
	CardComponent,
	IconComponent,
	FileViewerComponent,
} from '@shared/components';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {LibraryService} from '@shared/modules/library/services/library.service';

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
		forwardRef(() => TranslateModule),
		ButtonComponent,
		IconComponent,
		CardComponent,
		FileViewerComponent,
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
		this._course = course;
		this.filesAvailable = [];
		for (let prop in course)
			if (isBoolean(course[prop]) && !!course[prop])
				this.filesAvailable.push(prop);
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
	protected readonly class = 'flex-1';

	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.hasValidSubscription;

	protected filesAvailable: string[] = [];

	private _course?: CourseViewDto;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}

	completeLesson() {
		const nextIndex = (this.course?.order ?? 0) + 1;
		this.library
			.setCurrentLesson(nextIndex)
			.pipe(take(1))
			.subscribe(res => !res.error && this.nextLesson.emit(nextIndex));
	}
}
