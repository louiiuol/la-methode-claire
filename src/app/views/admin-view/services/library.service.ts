import {HttpEvent, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpResource} from '@core';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {Observable} from 'rxjs';

/**
 * Library Service for Admin only
 */
@Injectable()
export class LibraryAdminService extends HttpResource {
	protected resource = 'admin';

	refresh = () => this.post(null, {path: 'courses'});

	editCourse = (uuid: string, dto: Partial<CourseViewDto>) =>
		this.partialUpdate(uuid, dto, {path: 'courses'});

	upload(
		uuid: string,
		formData: FormData,
		type: string,
		method = 'PATCH'
	): Observable<HttpEvent<any>> {
		const path = [this.path, 'admin/courses', uuid, this.getTypeUrl(type)]
			.filter(x => !!x)
			.join('/');

		const req = new HttpRequest(method, path, formData, {
			reportProgress: true,
			responseType: 'json',
		});

		return this.http.request(req);
	}
	getTypeUrl(type: string) {
		return type == 'files' ? null : type;
	}

	deleteFile = (uuid: string, fieldName: string) =>
		this.delete(`${uuid}/files/${fieldName}`, {path: 'courses'});

	removeSound = (uuid: string, sound: string) =>
		this.delete(`${uuid}/sounds/${sound}`, {path: 'courses'});
}
