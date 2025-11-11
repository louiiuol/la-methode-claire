import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {map, tap} from 'rxjs';
import {PasswordResetDto, PasswordUpdateDto} from '../types';

/**
 * CRUD requests related to user's password.
 *
 * @author louiiuol
 */
@Injectable()
export class PasswordService extends HttpResource {
	protected resource = 'users';

	private readonly router = inject(Router);

	forgotPassword = (dto: {email: string}) =>
		this.post(dto, {
			customResource: '',
			path: 'forgot-password',
			notifyOnError: false,
			customAction: 'submit',
		}).pipe(
			map(res => {
				if (res.error) res.error = 'unknown_email';
				return res;
			})
		);

	resetPassword = (input: PasswordResetDto) => {
		const {user, passwordConfirm, ...dto} = input;
		return this.update(`${user}/reset-password`, dto).pipe(
			tap(res => {
				if (!res.error) {
					this.router
						.navigate(['/login'])
						.catch(err =>
							console.error('Failed to redirect to [LoginPage] ', err)
						);
				}
			})
		);
	};

	updatePassword = (dto: PasswordUpdateDto) =>
		this.partialUpdate(null, dto, {
			customResource: '',
			path: 'update-password',
		});
}
