import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {CourseViewDto} from '../types/course-view.dto';
import {environment} from '@env/environment';
import {HttpOutputEntity, HttpOutputArray, saveFile} from '@core';
import {of, map, take} from 'rxjs';

/**
 * CRUD requests related to library.
 *
 * @author louiiuol
 */
@Injectable()
export class LibraryService extends HttpResource {
	protected resource = 'courses';
	private lessons?: CourseViewDto[] | null;

	getLibrary = () =>
		this.lessons
			? of(this.lessons)
			: this.getAll<CourseViewDto>({notifyOnSuccess: false}).pipe(
					map(this.updateLocalLessons)
			  );

	setCurrentLesson = (index: number) =>
		this.partialUpdate<number>(null, null, {
			path: 'currentLesson',
			params: {index},
			notifyOnSuccess: false,
		});

	getPdf = (fileName: string) =>
		this.http.get([environment.root_url, 'courses', fileName].join('/'), {
			responseType: 'arraybuffer',
		});

	downloadPdf = (fileName: string) =>
		this.http
			.get([environment.root_url, 'courses', fileName, 'download'].join('/'), {
				responseType: 'arraybuffer',
			})
			.pipe(take(1))
			.subscribe((data: ArrayBuffer) => saveFile(data, fileName));

	downloadCourse = (index: number) =>
		this.http
			.get([environment.root_url, 'courses', index, 'download'].join('/'), {
				responseType: 'blob',
			})
			.subscribe(res => saveFile(res, (index + 1).toString(), 'zip'));

	private updateLocalLessons = (
		lessons: HttpOutputEntity<null> | HttpOutputArray<CourseViewDto>
	) => {
		const fetchedLessons = lessons.value;
		this.lessons = fetchedLessons;
		return fetchedLessons;
	};
}
