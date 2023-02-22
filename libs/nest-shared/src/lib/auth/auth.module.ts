import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './guards/local.strategy';
import {JwtStrategy} from './guards/jwt.strategy';
import {AuthController} from './auth.controller';
import {GoogleStrategy} from './google/google.strategy';
import {GoogleController} from './google/google.controller';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: {expiresIn: '360s'},
		}),
	],
	controllers: [AuthController, GoogleController],
	providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
