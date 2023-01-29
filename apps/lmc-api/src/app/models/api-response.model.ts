import {
	AbstractViewDTO,
	APIResponse as IAPIResponse,
	APIResponseOptions,
	PaginationConfig,
} from '@lmc/api-interfaces';
import {IncomingMessage} from 'http';

/**
 * Implementation of APIResponse for every response from this API. This will help us
 * to be more consistent with the rest of the codebase.
 */
export class APIResponse<T extends AbstractViewDTO> implements IAPIResponse<T> {
	timestamp: string;
	path: string;
	messages: string[];
	error: string;
	data: T | T[] | null;
	paginator: PaginationConfig | undefined;

	constructor(data?: T | T[], options?: APIResponseOptions) {
		// TODO Improve format => expected: 29/01/2023, 22:57:41
		this.timestamp = new Date().toISOString();
		this.path = options?.ctx?.getRequest<IncomingMessage>()?.url;
		this.setErrorMessages(options?.exception);
		this.data = data;
	}

	/**
	 * Sets the error messages for this response based on exceptions thrown
	 * by TypeOrm: QueryFailedError, EntityNotFoundError ...
	 * @param exception - The exception that caused this response to be created.
	 */
	private setErrorMessages = (exception: unknown): void => {
		const validationResponse = (exception as any)?.response;
		this.messages = validationResponse
			? validationResponse.message
			: [String(exception)];
		this.error = validationResponse ? validationResponse.error : 'Query Failed';
	};
}
