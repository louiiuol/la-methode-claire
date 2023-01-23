import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {User} from '@lmc/api-interfaces';

/**
 * Customised strategy to valide user when he request authenticated ressource
 * with given credentials (email/password)
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({usernameField: 'email'});
	}

	/**
	 * Checks if current user's credentials are valid, and returns the entity.
	 * Otherwise, throws an UnauthorizedException
	 * @param email user's identifier
	 * @param password user's password (must match stored pass)
	 * @returns User entity from database
	 * @see authService.validateUser
	 */
	async validate(email: string, password: string): Promise<Partial<User>> {
		const user = await this.authService.validateUser(email, password);
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
