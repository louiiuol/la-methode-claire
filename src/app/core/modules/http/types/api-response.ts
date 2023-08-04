import {ApiErrorDetails} from './api-error-details';
import {Pageable} from './pageable';

/**
 * Represents wrapper for every response from API
 * @internal
 */
export interface ApiResponse<T> {
	code: number;
	message: string;
	data?: T | Pageable<T> | T[] | null;
	error?: ApiErrorDetails | null;
}
