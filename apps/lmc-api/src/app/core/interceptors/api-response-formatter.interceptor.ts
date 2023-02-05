import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {APIResponse} from '../models/api-response.model';

/**
 * Intercept all requests and return a response formatted as APIResponse DTO.
 */
@Injectable()
export class APIResponseFormatter implements NestInterceptor {
	intercept = (context: ExecutionContext, next: CallHandler): Observable<any> =>
		next
			.handle()
			.pipe(map(res => new APIResponse(res, {ctx: context.switchToHttp()})));
}
