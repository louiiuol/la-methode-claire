import {ApiFormErrorDetails} from './api-error-form-details';
import {Pageable} from './pageable';

/**
 * Interface to be sent to components after HTTP request completion (success or failure)
 * * If Http request was successfully, returned data is wrapped inside `value` property with type inferred (more information in usage section).
 * * If Http request failed, then value will be undefined and `error` property will contains explanation on what happened.
 */
export interface HttpOutput<T> {
	value?: T | Pageable<T> | T[] | null;
	error?: ApiFormErrorDetails[] | string | null;
}

/**
 * HttpOutput with value property overridden as object
 * @internal
 */
export interface HttpOutputEntity<T> extends Pick<HttpOutput<T>, 'error'> {
	value?: T | null;
}

/**
 * HttpOutput with value property overridden as Array of object
 * @internal
 */
export interface HttpOutputArray<T> extends Pick<HttpOutput<T>, 'error'> {
	value?: T[] | null;
}

/**
 * HttpOutput with value property overridden as Paginated list of object
 * @internal
 */
export interface HttpOutputPaginated<T> extends Pick<HttpOutput<T>, 'error'> {
	value?: Pageable<T> | null;
}
