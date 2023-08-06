import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs';
import {PasswordResource} from './password.resource';
import {PasswordForgotDto, PasswordResetDto, PasswordUpdateDto} from '../types';

/**
 * Provides methods to handle user's password
 *
 * @author louiiuol
 */
@Injectable()
export class PasswordService {
	constructor(
		private http: PasswordResource,
		private router: Router
	) {}

	forgotPassword = (dto: PasswordForgotDto) =>
		this.http.forgotPassword(dto).pipe(
			map(res => {
				if (res.error) res.error = 'unknown_email';
				return res;
			})
		);

	resetPassword = (input: PasswordResetDto) => {
		const {user, passwordConfirm, ...dto} = input;
		return this.http.resetpassword(user, dto).pipe(
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

	updatePassword = (dto: PasswordUpdateDto) => this.http.updatePassword(dto);
}
