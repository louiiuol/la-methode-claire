import {Injectable, BadRequestException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';

import {User, TokenJWT, UserCreateDto} from '@lmc/api-interfaces';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
	private readonly salt = Number(environment.SALT);

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	register = async (user: UserCreateDto): Promise<void> => {
		user.password = await bcrypt.hash(user.password, this.salt);
		await this.usersService.save(user);
	};

	login = (user: User): TokenJWT => ({
		accessToken: this.jwtService.sign({
			username: user.email,
			sub: user.uuid,
		}),
	});

	/**
	 * Validate current credentials:
	 * * Finds user in database
	 * * Compare brcypt hash comparaison
	 * * remove password
	 * @returns user entity stored in database (password removed)
	 */
	async validateUser(email: string, pass: string): Promise<Partial<User>> {
		const user = await this.usersService.findOneByEmail(email);
		if (!(user && user.isActive && (await bcrypt.compare(pass, user.password))))
			return null;
		delete user.password;
		return user;
	}

	async googleLogin(req): Promise<TokenJWT> {
		if (!req.user) throw new BadRequestException('USER_NOT_FOUND');
		if (await this.usersService.findOneByEmail(req.user.email))
			return this.login(req.user);
		else {
			const user = await this.usersService.save(req.user);
			return {accessToken: user.accessToken};
		}
	}
}
