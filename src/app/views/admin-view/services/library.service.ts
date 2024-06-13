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

	deleteCourse = (uuid: string) =>
		this.delete(uuid).pipe(
			tap(() => this.notifier.success('Leçon supprimée avec succès'))
		);

	deleteFile = (uuid: string, fieldName: string) =>
		this.delete(`${uuid}/files/${fieldName}`).pipe(
			tap(() => this.notifier.success('Fichier supprimé avec succès'))
		);

	createPhoneme = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/phonemes`});

	editPhoneme = (courseUuid: string, uuid: string, dto: unknown) =>
		this.partialUpdate<CourseViewDto>(uuid, dto, {
			path: `${courseUuid}/phonemes`,
		});

	removePhoneme = (uuid: string, name: string) =>
		this.delete(`${uuid}/phonemes/${name}`).pipe(
			tap(() => this.notifier.success('Graphème supprimé avec succès'))
		);

	deletePhonemePoster = (
		courseUuid: string | undefined,
		uuid: string | undefined
	) =>
		this.delete(`${courseUuid}/phonemes/${uuid}/poster`).pipe(
			tap(() => this.notifier.success('Poster supprimé avec succès'))
		);

	createPoster = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/posters`});

	deletePoster = (courseUuid: string | undefined, name: string | undefined) =>
		this.delete(`${courseUuid}/posters/${name}`).pipe(
			tap(() => this.notifier.success('Poster supprimé avec succès'))
		);

	createSound = (uuid: string, dto: unknown) =>
		this.post(dto, {path: `${uuid}/sounds`});

	removeSound = (uuid: string, sound: string) =>
		this.delete(`${uuid}/sounds/${sound}`).pipe(
			tap(() => this.notifier.success('Son supprimé avec succès'))
		);

	reOrder = (dto: {newOrder: string[]}) =>
		this.update<CourseViewDto[]>(null, dto, {path: 'reorder'}).pipe(
			tap(() => this.notifier.success("L'ordre des leçons a été mis à jour"))
		);
}
