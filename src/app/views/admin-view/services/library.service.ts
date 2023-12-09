import {Injectable} from '@angular/core';
import {LibraryResource} from '@shared/modules/library/services/library.resource';

/**
 * Library Service for Admin only
 */
@Injectable()
export class LibraryService {
	constructor(private readonly http: LibraryResource) {}
	refresh = () => this.http.refreshLibrary();
}
