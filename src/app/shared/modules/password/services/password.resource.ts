import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {PasswordUpdateDto, PasswordResetApiDto} from '../types';

/**
 * CRUD requests related to user's password.
 *
 * @author louiiuol
 */
@Injectable()
export class PasswordResource extends HttpResource {
	protected resource = 'users';

	forgotPassword = (dto: {email: string}) =>
		this.create(dto, {
			customResource: '',
			path: 'forgot-password',
			notifyOnError: false,
			customAction: 'submit',
		});

	resetpassword = (uuid: string, dto: PasswordResetApiDto) =>
		this.update(uuid, dto, {
			path: 'reset-password',
		});

	updatePassword = (dto: PasswordUpdateDto) =>
		this.partialUpdate(null, dto, {path: 'update-password'});
}
