import {Injectable} from '@angular/core';
import {PasswordResource} from './password.resource';
import {map, tap} from 'rxjs';
import {ForgotPasswordDto, ResetPasswordDto} from '../types';
import {Router} from '@angular/router';

@Injectable()
export class PasswordService {
	constructor(private http: PasswordResource, private router: Router) {}

	forgotPassword = (dto: ForgotPasswordDto) =>
		this.http.forgotPassword(dto).pipe(
			map(res => {
				if (res.error) res.error = 'unknown_email';
				return res;
			})
		);

	resetPassword = (dto: ResetPasswordDto) => {
		const {token, password, passwordConfirm} = dto;
		return this.http
			.resetpassword(token, {
				password,
				_password: passwordConfirm,
			})
			.pipe(
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
}
