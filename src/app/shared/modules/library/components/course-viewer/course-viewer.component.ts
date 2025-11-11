import {UpperCasePipe} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	linkedSignal,
	output,
	signal,
} from '@angular/core';

import {MatButton, MatIconButton} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';

const MaterialModules = [
	MatChipsModule,
	MatSidenavModule,
	MatListModule,
	MatTooltipModule,
	MatIcon,
	MatButton,
	MatIconButton,
];

import {isBoolean, nullish, PlatformService} from '@core';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {FileViewerComponent} from '../file-viewer/file-viewer.component';

type FileDto = {name: string; path: string};

/**
 * Display lesson details, including phonemes, words and files for the given `Course`
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-course-viewer',
	host: {
		class:
			'flex-1 bg-white rounded-b-xl overflow-auto mat-elevation-z2 block w-full',
	},
	templateUrl: './course-viewer.component.html',
	styles: `
		:host mat-list-item div.active {
			background: var(--lmc-primary-color);
			color: white;
			font-weight: bold;
		}
	`,
	imports: [...MaterialModules, FileViewerComponent, UpperCasePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseViewerComponent {
	readonly currentUserLesson = input.required<number>();
	readonly course = input.required<CourseViewDto>();

	readonly loaded = output<boolean>();

	/**
	 * Defines current course to be shown. Depending on which course is given,
	 * this method will populate `filesAvailable` field with given course's files.
	 */
	// @Input({required: true}) set course(course: CourseViewDto | undefined) {
	// 	if (course) {
	// 		this.loaded.emit(false);
	// 		course.phonemes.sort((a, b) => a.name.localeCompare(b.name));
	// 		this._course = course;
	// 		this.currentLessonIndex = course.order;
	// 		this.refreshFilesAvailable(course);
	// 		this.setCurrentFile(this.filesAvailable.at(0));
	// 	}
	// }

	// /**
	//  * Defines current lesson' index for user. This property will be used to check if user
	//  * has already seen this course or not.
	//  */
	// @Input({required: true}) currentUserLesson!: number;

	// get course(): CourseViewDto | undefined {
	// 	return this._course;
	// }

	//@Input({required: true}) currentLessonIndex!: number;

	protected readonly library = inject(LibraryService);
	protected readonly platform = inject(PlatformService);

	//protected filesAvailable: {name: string; path: string}[] = [];
	//protected selectedFile: {name: string; path: string} | nullish;

	protected readonly MEDIA_FILE_NAMES: {
		[key: string]: {name: string; fileName: string};
	} = {
		script: {name: 'Script', fileName: 'script'},
		lesson: {name: 'Leçon', fileName: 'lesson'},
		exercices: {name: 'Exercices', fileName: 'exercices'},
		poster: {name: 'Affiche', fileName: 'poster'},
	};

	protected readonly loading = signal(false);

	// downloadFile(file: {name: string; path: string}) {
	// 	this.library.downloadPdf(`${this.course().order + 1}/files/${file.path}`);
	// }

	// downloadCourse() {
	// 	this.library.downloadCourse(this.course().order + 1);
	// }

	protected readonly filesAvailable = computed<FileDto[]>(() => {
		const course = this.course();
		const filesAvailable = [];
		for (let prop in course)
			if (isBoolean(course[prop]) && !!course[prop])
				filesAvailable.push({
					name: this.MEDIA_FILE_NAMES[prop].name,
					path: this.MEDIA_FILE_NAMES[prop].fileName,
				});
		const specificSounds: any[] = [];
		filesAvailable.push(
			...course.phonemes
				.filter(p => p.poster)
				.map(p => {
					return {
						name: 'Affiche ' + (p.endOfWord ? `-${p.name}` : p.name),
						path: 'poster-' + p.name.toLocaleUpperCase().replaceAll('/', '-'),
					};
				}),
			...(course.posterNames?.map(p => ({
				name: `Affiche ${p.toLocaleUpperCase()}`,
				path: `poster-${p.toLocaleUpperCase().replaceAll('/', '-')}`,
			})) ?? []),
			...specificSounds,
			...(course.sounds?.map(s => ({
				name: 'Son ' + s.toLocaleUpperCase(),
				path: 'poster-sound-' + s.toLocaleUpperCase(),
			})) ?? [])
		);
		return filesAvailable;
	});

	protected readonly selectedFile = linkedSignal<FileDto | nullish>(() => {
		const files = this.filesAvailable();
		return files.length > 0 ? files[0] : null;
	});

	protected readonly phonemes = computed(() =>
		this.course().phonemes.sort((a, b) => a.name.localeCompare(b.name))
	);

	// private refreshFilesAvailable(course: CourseViewDto) {
	// 	this.filesAvailable = [];
	// 	for (let prop in course)
	// 		if (isBoolean(course[prop]) && !!course[prop])
	// 			this.filesAvailable.push({
	// 				name: this.MEDIA_FILE_NAMES[prop].name,
	// 				path: this.MEDIA_FILE_NAMES[prop].fileName,
	// 			});
	// 	const specificSounds: any[] = [];
	// 	this.filesAvailable.push(
	// 		...course.phonemes
	// 			.filter(p => p.poster)
	// 			.map(p => {
	// 				return {
	// 					name: 'Affiche ' + (p.endOfWord ? `-${p.name}` : p.name),
	// 					path: 'poster-' + p.name.toLocaleUpperCase().replaceAll('/', '-'),
	// 				};
	// 			}),
	// 		...(course.posterNames?.map(p => ({
	// 			name: `Affiche ${p.toLocaleUpperCase()}`,
	// 			path: `poster-${p.toLocaleUpperCase().replaceAll('/', '-')}`,
	// 		})) ?? []),
	// 		...specificSounds,
	// 		...(course.sounds?.map(s => ({
	// 			name: 'Son ' + s.toLocaleUpperCase(),
	// 			path: 'poster-sound-' + s.toLocaleUpperCase(),
	// 		})) ?? [])
	// 	);
	// }
}
