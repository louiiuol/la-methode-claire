/**
 * Pagination representation of items list.
 */
export interface Pageable<T> {
	/**
	 * List of items
	 */
	items: T[];

	/**
	 * Configuration of the paginator
	 */
	paginator: {
		/**
		 * Current page index
		 */
		page: number;
		/**
		 * Size of the page (nb of items in the list)
		 */
		limit: number;

		/**
		 * Total length of items, matching query, in database,
		 */
		total: number;
	};
}
