import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
} from '@angular/core';
import {NgFor, NgIf, UpperCasePipe} from '@angular/common';

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
import {take} from 'rxjs';

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
		UpperCasePipe,
	],
	selector: 'app-course-viewer',
	templateUrl: './course-viewer.component.html',
	styles: [
		`
			:host mat-list-item div.active {
				background: var(--lmc-primary-color);
				color: white;
				font-weight: bold;
				padding: 0.75em 1em;
				border-radius: 18px;
			}
		`,
	],
})
export class CourseViewerComponent {
	/**
	 * Defines current course to be shown. Depending on which course is given,
	 * this method will populate `filesAvailable` field with given course's files.
	 */
	@Input({required: true}) set course(course: CourseViewDto | undefined) {
		if (course) {
			this.loaded.emit(false);
			course.phonemes.sort((a, b) => a.name.localeCompare(b.name));
			this._course = course;
			this.refreshFilesAvailable(course);
			this.setCurrentFile(this.filesAvailable.at(0));
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

	/**
	 * Emits new value when loading status changes.
	 */
	@Output() loaded = new EventEmitter<boolean>();

	@HostBinding('class')
	protected readonly class =
		'flex-1 bg-white rounded-b-xl overflow-auto mat-elevation-z2 block w-full';

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

	protected loading = false;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService,
		protected readonly platform: PlatformService
	) {}

	setCurrentLesson(index: number) {
		if (!this.loading) {
			this.loading = true;
			this.library
				.setCurrentLesson(index)
				.pipe(take(1))
				.subscribe(res => {
					if (!res.error) {
						this.currentLessonIndex = index;
						this.currentUserLesson = index;
						this.nextLesson.emit(index);
						this.loaded.emit(false);
						this.authenticator.updateCurrentUser({currentLesson: index});
						this.loading = false;
					}
				});
		}
	}

	setCurrentFile(file?: {name: string; path: string}) {
		this.loading = true;
		this.loaded.emit(false);
		this.selectedFile = file;
	}

	downloadFile(file: {name: string; path: string}) {
		this.library.downloadPdf(
			`${(this.course?.order ?? 0) + 1}/files/${file.path}`
		);
	}

	downloadCourse() {
		this.library.downloadCourse(this.currentLessonIndex + 1);
	}

	fileLoaded() {
		this.loaded.emit(true);
		this.loading = false;
	}

	private refreshFilesAvailable(course: CourseViewDto) {
		this.filesAvailable = [];
		for (let prop in course)
			if (isBoolean(course[prop]) && !!course[prop])
				this.filesAvailable.push({
					name: this.filesName[prop].name,
					path: this.filesName[prop].fileName,
				});
		const specificSounds: any[] = [];
		this.filesAvailable.push(
			...course.phonemes
				.filter(p => p.poster)
				.map(p => {
					if (p.posterNames?.length) {
						p.posterNames.forEach(posterName =>
							specificSounds.push({
								name:
									'Affiche ' + (p.endOfWord ? `-${posterName}` : posterName),
								path:
									'affiche-' +
									posterName.toLocaleUpperCase().replaceAll('/', '-'),
							})
						);
					}
					return p;
				})
				.filter(p => !p.posterNames?.length)
				.map(p => {
					return {
						name: 'Affiche ' + (p.endOfWord ? `-${p.name}` : p.name),
						path: 'affiche-' + p.name.toLocaleUpperCase().replaceAll('/', '-'),
					};
				}),
			...specificSounds,
			...(course.sounds?.map(s => ({
				name: 'Son ' + s,
				path: 'affiche-son' + s.toLocaleUpperCase(),
			})) ?? [])
		);
	}
}
