import {Injectable} from '@angular/core';
import {LibraryResource} from './library.resource';
import {map, of} from 'rxjs';
import {CourseViewDto} from '../types/course-view.dto';
import {HttpOutputEntity, HttpOutputArray} from '@core';

/**
 * Provides methods to handle user's library
 *
 * @author louiiuol
 */
@Injectable()
export class LibraryService {
	private lessons?: CourseViewDto[] | null;
	constructor(private readonly http: LibraryResource) {}

	getLibrary = () =>
		this.lessons
			? of(this.lessons)
			: this.http.getLibrary().pipe(map(this.updateLocalLessons));

	setCurrentLesson = (index: number) => this.http.setCurrentLessonIndex(index);

	getPdf = (fileName: string) => this.http.getPdf(fileName);

	private updateLocalLessons = (
		lessons: HttpOutputEntity<null> | HttpOutputArray<CourseViewDto>
	) => {
		const fetchedLessons = lessons.value;
		this.lessons = fetchedLessons;
		return fetchedLessons;
	};
}
