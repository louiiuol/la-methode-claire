import {Injectable} from '@angular/core';
import {HttpResource} from '@core';

/**
 * Library Service for Admin only
 */
@Injectable()
export class LibraryService extends HttpResource {
	protected resource = 'admin';

	refresh = () => this.post(null, {path: 'courses'});
}
