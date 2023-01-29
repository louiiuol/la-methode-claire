import {AbstractViewDTO} from './abstract-view.dto';
import {HttpArgumentsHost} from '@nestjs/common/interfaces';
import {PaginationConfig} from './pagination-config';

/**
 * Configurational options for creating an APIResponse
 */
export type APIResponseOptions = {
	ctx?: HttpArgumentsHost;
	exception?: unknown;
	paginator?: PaginationConfig;
};

/**
 * Represents wrapper for every response from API
 */
export interface APIResponse<T extends AbstractViewDTO | null> {
	timestamp: string;
	path: string;
	messages: string[];
	data: T | T[] | null;
	error: string | undefined;
	paginator: PaginationConfig | undefined;
}
