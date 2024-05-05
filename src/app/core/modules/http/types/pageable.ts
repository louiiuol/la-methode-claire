/**
 * Pagination representation of items list.
 */
export interface Pageable<T> {
	/**
	 * List of items
	 */
	items: T[];

	/**
	 * Current page index
	 */
	page: number;
	/**
	 * Size of the page (nb of items in the list)
	 */
	size: number;

	/**
	 * Total length of items, matching query, in database,
	 */
	totalItems: number;
}
