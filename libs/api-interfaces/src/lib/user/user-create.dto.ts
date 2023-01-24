import {AutoMap} from '@automapper/classes';
import {IsString} from 'class-validator';
import {UserLoginDto} from './user-login.dto';

export type AuthProviders = 'local' | 'google';

export class UserCreateDto extends UserLoginDto {
	@IsString()
	@AutoMap()
	provider: AuthProviders = 'local';
}
