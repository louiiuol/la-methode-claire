import {Injectable} from '@angular/core';
import {HttpResource} from '@core';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {tap} from 'rxjs';

/**
 * Library Service for Admin only
 */
@Injectable()
export class LibraryAdminService extends HttpResource {
	protected resource = 'admin/courses';

	createCourse = () =>
		this.post<CourseViewDto>(null).pipe(
			tap(() => this.notifier.success('Leçon ajoutée avec succès!'))
		);

	editCourse = (uuid: string, dto: unknown) => this.partialUpdate(uuid, dto);

	deleteCourse = (uuid: string) => this.delete(uuid);

	deleteFile = (uuid: string, fieldName: string) =>
		this.delete(`${uuid}/files/${fieldName}`);

	createPhoneme = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/phonemes`});

	editPhoneme = (courseUuid: string, uuid: string, dto: unknown) =>
		this.partialUpdate<CourseViewDto>(uuid, dto, {
			path: `${courseUuid}/phonemes`,
		});

	removePhoneme = (uuid: string, name: string) =>
		this.delete(`${uuid}/phonemes/${name}`);

	deletePhonemePoster = (
		courseUuid: string | undefined,
		uuid: string | undefined
	) => this.delete(`${courseUuid}/phonemes/${uuid}/poster`);

	createPoster = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/posters`});

	deletePoster = (courseUuid: string | undefined, name: string | undefined) =>
		this.delete(`${courseUuid}/posters/${name}`);

	createSound = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/sounds`});

	removeSound = (uuid: string, sound: string) =>
		this.delete(`${uuid}/sounds/${sound}`);

	reOrder = (dto: {newOrder: string[]}) =>
		this.update<CourseViewDto[]>(null, dto, {path: 'reorder'});
}
