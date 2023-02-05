import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './guards/local.strategy';
import {JwtStrategy} from './guards/jwt.strategy';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {GoogleStrategy} from './google/google.strategy';
import {environment} from '../../../../../apps/lmc-api/src/environments/environment.prod';
import {GoogleController} from './google/google.controller';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: environment.JWT_SECRET_KEY,
			signOptions: {expiresIn: '360s'},
		}),
	],
	controllers: [AuthController, GoogleController],
	providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
