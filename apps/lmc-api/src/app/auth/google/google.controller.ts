import {TokenJWT} from '@lmc/api-interfaces';
import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from '../auth.service';

@Controller('auth/google')
export class GoogleController {
	constructor(private authService: AuthService) {}

	@Get('login')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req): Promise<TokenJWT> {
		return this.authService.googleLogin(req);
	}
}
