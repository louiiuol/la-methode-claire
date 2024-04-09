export type PaginationFilters = Partial<{
	page: number;
	size: number;
	sort: string;
	filter: string | null;
}>;
