import {AbstractViewDTO} from './abstract-view.dto';
import {HttpArgumentsHost} from '@nestjs/common/interfaces';
import {PaginationConfig} from './pagination-config';

export type APIResponseOptions = {
	ctx?: HttpArgumentsHost;
	exception?: unknown;
	paginator?: PaginationConfig;
};

/**
 * Represents wrapper for every response from API
 */
export interface APIResponse<T extends AbstractViewDTO | void | undefined> {
	timestamp: string;
	path: string;
	messages: string[];
	data: T | T[] | undefined;
	error: string | undefined;
	paginator:
		| {
				index: number;
				limit: number;
				length: number;
		  }
		| undefined;
}
