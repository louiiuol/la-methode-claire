import {SortOptions} from './sort-options';

export interface PaginationConfig {
	sortBy?: 'name' | 'date';
	name?: string;
	isStored: boolean;
	isMultiEncoded: boolean;
	order?: SortOptions['order'];
	page: number;
	limit: number;
	startAt?: string;
	endAt?: string;
}
