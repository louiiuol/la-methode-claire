import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {CourseViewDto} from '../types/course-view.dto';

/**
 * CRUD requests related to library.
 *
 * @author louiiuol
 */
@Injectable()
export class LibraryResource extends HttpResource {
	protected resource = 'courses';

	getLibrary = () => this.getAll<CourseViewDto>({notifyOnSuccess: false});

	setCurrentLessonIndex = (index: number) =>
		this.partialUpdate<number>(null, null, {
			path: 'currentLesson',
			params: {index},
			notifyOnSuccess: false,
		});
}
