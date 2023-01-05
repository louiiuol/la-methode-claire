export interface Pageable<T> {
	data: T[];
	pagination: {
		currentPage: number;
		itemPerPage: number;
		totalItem: number;
	};
}
