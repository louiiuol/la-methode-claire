import {inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, of, throwError} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

import {environment} from '@env/environment';
import {NotificationService} from '@core/modules/notification/services/notification.service';
import {
	ApiResponse,
	RequestOptions,
	RequestActions,
	HttpOutputEntity,
	HttpOutputArray,
	HttpOutputPaginated,
	HttpOutput,
} from '../types';
import {clean} from '@core/helpers';

/**
 * Abstract class to automate workflow for every REST requests performed by the application
 *
 * <strong>Every classes implementing this class must create a `resource` property matching http resource path</strong>
 */
export abstract class HttpResource {
	/**
	 * Path of the resource to target.
	 */
	protected abstract resource: string;
	protected readonly path = environment.root_url;
	protected readonly http = inject(HttpClient);
	protected readonly notifier = inject(NotificationService);
	protected readonly translator = inject(TranslateService);

	/**
	 * Retrieve one item (matching given id) on requested resource
	 *
	 * `<T>` defines the return's type
	 * @param uuid identifier of element
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected get = <T>(uuid?: string | null, opt?: RequestOptions) =>
		this.http
			.get<ApiResponse<T>>(
				this.generateURI(uuid, opt?.path),
				this.getRequestOptions(opt)
			)
			.pipe(
				map(res => this.formatData(res, 'get', opt) as HttpOutputEntity<T>),
				catchError(err => this.formatError<T>(err, 'get', opt))
			);

	/**
	 * Retrieve all items on requested resource
	 *
	 * `<T>` defines the return's type
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected getAll = <T>(opt?: RequestOptions) =>
		this.http
			.get<ApiResponse<T>>(
				this.generateURI(null, opt?.path),
				this.getRequestOptions(opt)
			)
			.pipe(
				map(res => this.formatData<T>(res, 'get', opt) as HttpOutputArray<T>),
				catchError(err => this.formatError<T>(err, 'get', opt))
			);

	/**
	 * Retrieve all items, paginated, on requested resource
	 *
	 * `<T>` defines the return's type
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected getAllPaginated = <T>(opt?: RequestOptions) =>
		this.http
			.get<ApiResponse<T>>(
				this.generateURI(null, opt?.path),
				this.getRequestOptions(opt)
			)
			.pipe(
				map(
					res => this.formatData<T>(res, 'get', opt) as HttpOutputPaginated<T>
				),
				catchError(err => this.formatError<T>(err, 'get', opt))
			);

	/**
	 * Perform POST request with given dto
	 *
	 * `<T>` defines the return's type
	 * @param dto input to create
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected create = <T>(dto: unknown, opt?: RequestOptions) =>
		this.http
			.post<ApiResponse<T>>(
				this.generateURI(null, opt?.path),
				dto,
				this.getRequestOptions(opt)
			)
			.pipe(
				map(res => this.formatData(res, 'create', opt) as HttpOutputEntity<T>),
				catchError(err => this.formatError<T>(err, 'create', opt))
			);

	/**
	 * Perform PUT request with given dto (update complete entity in database)
	 *
	 * `<T>` defines the return's type
	 * @param uuid identifier of the entity to update
	 * @param dto input to use for update
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected update = <T>(
		uuid: string | null,
		dto: unknown,
		opt?: RequestOptions
	) =>
		this.http
			.put<ApiResponse<T>>(
				this.generateURI(uuid, opt?.path),
				dto,
				this.getRequestOptions(opt)
			)
			.pipe(
				map(
					res => this.formatData<T>(res, 'update', opt) as HttpOutputEntity<T>
				),
				catchError(err => this.formatError<T>(err, 'update', opt))
			);

	/**
	 * Perform PATCH request with given dto (update partially entity in database)
	 *
	 * `<T>` defines the return's type
	 * @param uuid identifier of the entity to update
	 * @param dto input to use for update
	 * @param opt request options
	 * @returns {HttpOutput} request formatted output
	 */
	protected partialUpdate = <T>(
		uuid: string | null,
		dto: unknown,
		opt?: RequestOptions
	) =>
		this.http
			.patch<ApiResponse<T>>(
				this.generateURI(uuid, opt?.path),
				dto,
				this.getRequestOptions(opt)
			)
			.pipe(
				map(
					res => this.formatData<T>(res, 'update', opt) as HttpOutputEntity<T>
				),
				catchError(err => this.formatError<T>(err, 'update', opt))
			);

	/**
	 * Perform DELETE request on given resource
	 *
	 * `<T>` defines the return's type
	 * @param uuid identifier of the entity to update
	 * @returns {HttpOutput} request formatted output
	 */
	protected delete = (uuid: string, opt?: RequestOptions) =>
		this.http
			.delete<ApiResponse<string>>(
				this.generateURI(uuid, opt?.path),
				this.getRequestOptions(opt)
			)
			.pipe(
				map(
					res => this.formatData(res, 'delete', opt) as HttpOutputEntity<string>
				),
				catchError(err => this.formatError<string>(err, 'delete', opt))
			);

	/**
	 * Generate the url the service is gonna use for all the request
	 * @param uuid will use that uuid to format the url
	 * @returns the url containing the base and the uuid
	 */
	protected generateURI = (
		uuid?: string | null,
		customResource?: string
	): string => {
		let result = this.path;
		if (this.resource) result += `/${this.resource}`;
		if (customResource) result += `/${customResource}`;
		if (uuid) result += `/${uuid}`;
		return result;
	};

	private getRequestOptions = (opt?: RequestOptions) => ({
		headers: opt?.headers,
		params: clean(opt?.params),
	});

	private formatData = <T>(
		res: Pick<ApiResponse<T>, 'data'>,
		action: RequestActions,
		opt: RequestOptions | undefined
	): HttpOutput<T> => {
		const resource = this.resource === '' ? 'auth' : this.resource;
		if (opt?.notifyOnSuccess || ['update', 'delete'].includes(action))
			this.notifier.success(`core.api.resources.${resource}`, {
				key: 'core.states.success',
				param: {
					action: this.translator.instant(
						`core.actions.${opt?.customAction ?? action}.done`
					),
				},
			});

		return {
			value: res.data ?? (res as any),
		};
	};

	private formatError = <T>(
		httpError: HttpErrorResponse,
		action: RequestActions,
		opt: RequestOptions | undefined
	) => {
		const error = httpError.error ?? httpError;
		// General notification (based on code, resource and method called)
		// Invalid credentials
		// No result found
		// Expired token
		// Already exists
		// Invalid input
		// Network pb
		// FOR 408 (TIMEOUT), la request should retry 3 times
		// FOR 429, create 30 seconds timeout before sending next request
		if (this.resource === '') this.resource = 'auth';
		if (opt?.notifyOnError !== false)
			this.notifier.error(`core.api.resources.${this.resource}`, {
				key: 'core.states.failed',
				param: {
					action: this.translator.instant(
						`core.actions.${opt?.customAction ?? action}.action`
					),
				},
			});

		console.error(
			`(${new Date().toLocaleDateString()}) [${error.code}] HTTP failed to ${
				opt?.customAction ?? action
			} on [${this.resource.toLocaleUpperCase()}]`,
			error.error ?? httpError
		);

		let returnedError = error.error ?? error.message ?? error;
		if (Array.isArray(returnedError) && returnedError.length === 1)
			returnedError = returnedError[0];
		return of({
			error: returnedError,
		} as HttpOutputEntity<null>);
	};

	private handleError(error: HttpErrorResponse) {
		if (error.status === 0) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(
				`Backend returned code ${error.status}, body was: `,
				error.error
			);
		}
		// Return an observable with a user-facing error message.
		return throwError(
			() => new Error('Something bad happened; please try again later.')
		);
	}
}
