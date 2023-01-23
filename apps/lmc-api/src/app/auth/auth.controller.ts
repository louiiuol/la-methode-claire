import {Controller, Post, UseGuards, Body} from '@nestjs/common';
import {
	TokenJWT,
	User,
	UserCreateDto,
	UserLoginDto,
	UserViewDto,
} from '@lmc/api-interfaces';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/register')
	async register(@Body() dto: UserCreateDto): Promise<UserViewDto> {
		return await this.authService.register(dto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Body() dto: UserLoginDto): TokenJWT {
		return this.authService.login(dto as User);
	}

	// TODO Add password controller
	//* Forget password (send email if user exists)
	//* Reset password (w/ token from email => request from IHM)
	//* Update password (w/ currentPassword and current Token)
}
