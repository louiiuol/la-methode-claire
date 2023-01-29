import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	Injectable,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import {Response} from 'express';
import {EntityNotFoundError, QueryFailedError} from 'typeorm';
import {APIResponse} from '../../models/api-response.model';

/**
 ** Custom exception filter to convert EntityNotFoundError & QueryFailedError
 ** from TypeOrm error event to NestJs responses as proper DTO
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Injectable()
@Catch(QueryFailedError, EntityNotFoundError, BadRequestException)
export class ExceptionHandler implements ExceptionFilter {
	/**
	 * Entry point to catch any errors.
	 * @param exception - The exception that caused this response to be created.
	 * @param host - The host that caused this exception.
	 * @returns {APIResponse} - Explain why this exception happened.
	 */
	catch = (
		exception: unknown,
		host: ArgumentsHost
	): Response<APIResponse<null>> =>
		host
			.switchToHttp()
			.getResponse<Response>()
			.status(this.getStatusCode(exception))
			.json(new APIResponse(null, {ctx: host.switchToHttp(), exception}));

	/**
	 * Cast exception to number status code.
	 * @param exception - The exception that caused this response to be created.
	 * @returns Status code of the exception.
	 */
	private getStatusCode = (exception: unknown): number =>
		exception instanceof EntityNotFoundError
			? HttpStatus.NOT_FOUND
			: HttpStatus.BAD_REQUEST;
}
