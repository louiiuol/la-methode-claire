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

import {CourseViewDto} from '../types/course-view.dto';
import {TrustUrlPipe} from '@shared/pipes';
import {
	ButtonComponent,
	CardComponent,
	IconComponent,
} from '@shared/components';
import {AuthService, TranslateModule} from '@core';
import {LibraryService} from '../services/library.service';

/**
 * Display lesson details
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
		forwardRef(() => TranslateModule),
	],
	selector: 'app-course-viewer',
	templateUrl: './course-viewer.component.html',
})
export class CourseViewerComponent {
	@Input({required: true}) set course(course: CourseViewDto) {
		this._course = course;
		this.filesAvailable = [];
		for (let prop in course) {
			if (typeof (course as any)[prop] === 'boolean' && !!(course as any)[prop])
				this.filesAvailable.push(prop);
		}
	}

	get course() {
		return this._course as CourseViewDto;
	}

	@Input({required: true}) currentLessonIndex!: number;

	@Output() nextLesson = new EventEmitter();

	@HostBinding('class') class = 'flex-1';

	filesAvailable: string[] = [];

	hasValidSubscription =
		!!this.authenticator?.currentUser?.hasValidSubscription;

	private _course?: CourseViewDto;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}

	completeLesson() {
		const nextIndex = this.course.order + 1;
		this.library
			.setCurrentLesson(nextIndex)
			.pipe(take(1))
			.subscribe(res => {
				if (!res.error) {
					this.nextLesson.emit(nextIndex);
				}
			});
	}
}
