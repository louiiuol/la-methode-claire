import {Injectable} from '@angular/core';
import {LibraryResource} from './library.resource';
import {map} from 'rxjs';

/**
 * Provides methods to handle user's library
 *
 * @author louiiuol
 */
@Injectable()
export class LibraryService {
	constructor(private readonly http: LibraryResource) {}

	getLibrary = () => this.http.getLibrary().pipe(map(lessons => lessons.value));

	setCurrentLesson = (index: number) => this.http.setCurrentLessonIndex(index);
}
