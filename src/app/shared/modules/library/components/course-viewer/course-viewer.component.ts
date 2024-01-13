import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
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
	MatTooltipModule,
];

import {AuthService, PlatformService, isBoolean} from '@core';
import {
	ButtonComponent,
	CardComponent,
	IconComponent,
	MessageComponent,
} from '@shared/components';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {FileViewerComponent} from '../file-viewer/file-viewer.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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
		...MaterialModules,
		ButtonComponent,
		IconComponent,
		CardComponent,
		FileViewerComponent,
		MessageComponent,
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
					this.filesAvailable.push({
						name: this.filesName[prop].name,
						path: this.filesName[prop].fileName,
					});
			this.filesAvailable.push(
				...course.phonemes
					.filter(p => p.poster)
					.map(p => ({
						name: 'Affiche ' + p.name,
						path: 'affiche-' + p.name.toLocaleUpperCase(),
					})),
				...(course.sounds?.map(s => ({
					name: 'Son ' + s,
					path: 'affiche-son' + s.toLocaleUpperCase(),
				})) ?? [])
			);
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
	protected readonly class =
		'flex-1 bg-accent rounded-b-xl overflow-auto mat-elevation-z2 block h-96';

	@HostBinding('style') style = 'height: min(1080px, 70vh)';

	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.subscribed;

	protected currentUserLesson =
		this.authenticator?.currentUser()?.currentLesson ?? 0;

	protected filesAvailable: {name: string; path: string}[] = [];
	protected selectedFile?: {name: string; path: string} | null;

	private _course?: CourseViewDto;

	protected readonly filesName: {
		[key: string]: {name: string; fileName: string};
	} = {
		script: {name: 'Script', fileName: 'script'},
		lesson: {name: 'Leçon', fileName: 'lecon'},
		exercice: {name: 'Exercices', fileName: 'exercices'},
		poster: {name: 'Affiche', fileName: 'affiche'},
	};

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService,
		protected readonly platform: PlatformService
	) {}

	setCurrentLesson(index: number) {
		this.library.setCurrentLesson(index).subscribe(res => {
			if (!res.error) {
				this.currentLessonIndex = index;
				this.currentUserLesson = index;
				this.nextLesson.emit(index);
				this.authenticator.updateCurrentUser({currentLesson: index});
			}
		});
	}

	setCurrentFile(file: {name: string; path: string}) {
		this.selectedFile = file;
	}

	downloadFile(file: {name: string; path: string}) {
		fetch(file.path)
			.then(response => response.blob())
			.then(blob => {
				// Create a temporary link element
				const link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = `${file.name}.pdf`;

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
	}
}
