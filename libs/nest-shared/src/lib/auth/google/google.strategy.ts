import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';

import {BadRequestException, Injectable} from '@nestjs/common';
import {environment} from 'apps/lmc-api/src/environments/environment';
import {UserGoogle} from './user-google.dto';

const callbackURL = `https://${environment.DATABASE_HOST}:${environment.API_PORT}/${environment.API_PREFIX}/${environment.GOOGLE_CALLBACK_URL}`;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: environment.GOOGLE_CLIENT_ID,
			clientSecret: environment.GOOGLE_SECRET,
			callbackURL,
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: UserGoogle
	): Promise<any> {
		if (!profile._json.email_verified)
			throw new BadRequestException('EMAIL_NOT_VERIFIED');
		profile.accessToken = accessToken;
		profile.refreshToken = refreshToken;
		profile.provider = 'google';
		return profile;
	}
}
