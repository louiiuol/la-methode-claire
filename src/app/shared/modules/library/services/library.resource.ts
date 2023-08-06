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

	getLibrary = () => this.getAll<CourseViewDto>();

	setCurrentLessonIndex = (index: number) =>
		this.get(null, {
			path: 'next',
			params: {index},
		});
}
