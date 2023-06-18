import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {ResetPasswordApiDto} from '../types';

/**
 * CRUD requests related to user's password.
 * @internal
 */
@Injectable()
export class PasswordResource extends HttpResource {
	protected resource = 'users';

	forgotPassword = (dto: {email: string}) =>
		this.create(dto, {
			path: 'forgotten-password',
			notifyOnSuccess: true,
			notifyOnError: false,
			customAction: 'submit',
		});

	resetpassword = (token: string, dto: ResetPasswordApiDto) =>
		this.update(null, dto, {
			path: 'change-password',
			headers: new HttpHeaders({Authorization: 'Bearer ' + token}),
		});
}
