/**
 * Represents wrapper for every response from API
 */
export interface APIResponse<T> {
	code: number;
	data: T;
	message?: string[];
	error?: string[];
	pagination?: {
		currentPage: number;
		itemPerPage: number;
		totalItem: number;
	};
}
