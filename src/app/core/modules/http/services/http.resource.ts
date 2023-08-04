import {inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, of} from 'rxjs';
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

	private readonly statusTranslation: {[key: number]: string} = {
		0: 'server_down',
		401: 'token_expired',
		403: 'forbidden',
		404: 'not_found',
		409: 'conflict',
		502: 'server_restarting',
	};

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
				this.generateURI(uuid, opt),
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
			.get<ApiResponse<T[]>>(
				this.generateURI(null, opt),
				this.getRequestOptions(opt)
			)
			.pipe(
				map(res => this.formatData<T[]>(res, 'get', opt) as HttpOutputArray<T>),
				catchError(err => this.formatError<null>(err, 'get', opt))
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
				this.generateURI(null, opt),
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
				this.generateURI(null, opt),
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
				this.generateURI(uuid, opt),
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
				this.generateURI(uuid, opt),
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
				this.generateURI(uuid, opt),
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
		opt?: RequestOptions
	): string => {
		let result = this.path;
		if (opt?.customResource) result += `/${opt.customResource}`;
		else if (opt?.customResource !== '' && this.resource !== '')
			result += `/${this.resource}`;
		if (uuid) result += `/${uuid}`;
		if (opt?.path) result += `/${opt.path}`;
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
		const resource =
			opt?.customResource ?? this.resource === '' ? 'auth' : this.resource;
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
		response: HttpErrorResponse,
		action: RequestActions,
		opt: RequestOptions | undefined
	) => {
		const res = response.error as ApiResponse<null>;
		console.log(res);
		const resource =
			opt?.customResource ?? this.resource === '' ? 'auth' : this.resource;
		console.error(
			`(${new Date().toLocaleDateString()}) [${res.code}] HTTP failed to ${
				opt?.customAction ?? action
			} on [${resource.toLocaleUpperCase()}]`,
			res
		);

		const commonErrorMessage = this.statusTranslation[res.code];
		if (commonErrorMessage && opt?.notifyOnError !== false) {
			this.notifier.error(
				'core.api.errors.generic',
				`core.api.errors.${commonErrorMessage}`
			);
			return of({
				error: null,
			} as HttpOutputEntity<null>);
		}

		if (res.code === 422) {
			// TODO Format reasons as ApiFormErrorDTO
			return of({error: res.error?.reasons} as HttpOutputEntity<null>);
		}

		if (opt?.notifyOnError !== false)
			this.notifier.error(`core.api.resources.${resource}`, {
				key: 'core.states.failed',
				param: {
					action: this.translator.instant(
						`core.actions.${opt?.customAction ?? action}.action`
					),
				},
			});
		return of({
			error: res.message,
		} as HttpOutputEntity<null>);
	};
}
