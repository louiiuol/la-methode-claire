import {
	APIResponse as IAPIResponse,
	APIResponseOptions,
	PaginationConfig,
} from '@lmc/api-interfaces';
import {IncomingMessage} from 'http';

type APIResponseDataType<T> = T | T[] | null;

/**
 * Implementation of APIResponse for every response from this API. This will help us
 * to be more consistent with the rest of the codebase.
 */
export class APIResponse<T> implements IAPIResponse<T> {
	timestamp: string;
	path: string;
	messages: string[];
	error: string;
	data: APIResponseDataType<T>;
	paginator: PaginationConfig | undefined;

	constructor(data: APIResponseDataType<T>, options: APIResponseOptions) {
		const incomingMessage = options?.ctx?.getRequest<IncomingMessage>();
		// TODO Improve format => expected: 29/01/2023, 22:57:41
		this.timestamp = new Date().toISOString();
		this.path = incomingMessage?.url;
		this.data = data;
		if (options?.exception) this.setErrorMessages(options?.exception);
		else this.setSuccessMessages(incomingMessage);
	}

	private setSuccessMessages(input?: IncomingMessage): void {
		const actions = {
			POST: 'Action',
			PUT: 'Full update',
			PATCH: 'Partial update',
			DELETE: 'Deletion',
		};
		this.messages = [
			`${actions[input.method]} has been achieved successfully. 🎉`,
		];
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
		this.error = validationResponse
			? validationResponse.error
			: 'Query Failed: unknown error occured 🎩';
	};
}
