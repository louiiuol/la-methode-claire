import {Injectable} from '@angular/core';
import {RegisterDto} from '../types/register.dto';
import {User, UserPreviewDto} from '@shared/modules/users/types';
import {Token} from '../types/token.dto';
import {LoginDto} from '../types/login.dto';
import {HttpResource} from '@core/modules/http/services/http.resource';

/**
 * CRUD requests related to user's authentication.
 * @internal
 */
@Injectable()
export class AuthResource extends HttpResource {
	protected resource = '';

	signUp = (dto: RegisterDto) =>
		this.create<Partial<User>>(dto, {
			path: 'register',
			customAction: 'register',
			notifyOnSuccess: true,
		});

	logIn = (dto: LoginDto) =>
		this.create<Token>(dto, {path: 'auth/login', customAction: 'login'});

	whoAmI = () => this.get<UserPreviewDto>(null, {path: 'profile'});
}
