import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';

import {BadRequestException, Injectable} from '@nestjs/common';
import {environment} from 'apps/lmc-api/src/environments/environment';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: environment.GOOGLE_CLIENT_ID,
			clientSecret: environment.GOOGLE_SECRET,
			callbackURL: 'http://localhost:3333/api/auth/redirect',
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any
	): Promise<any> {
		if (!profile._json.email_verified)
			throw new BadRequestException('EMAIL_NOT_VERIFIED');
		profile.accessToken = accessToken;
		profile.resfreshToken = refreshToken;
		profile.provider = 'google';
		return profile;
	}
}
