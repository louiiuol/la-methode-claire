import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';

import {BadRequestException, Injectable} from '@nestjs/common';
import {UserGoogle} from './user-google.dto';

import * as dotenv from 'dotenv';
dotenv.config();

const callbackURL = `http://${process.env.API_HOST}:${process.env.API_PORT}/${process.env.API_PREFIX}/auth/google/redirect`;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
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
