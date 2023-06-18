import {User} from '@shared/modules/users';

/**
 * DTO used to register a new user
 *
 * Input of `POST /api/register`
 */
export interface RegisterDto extends Pick<User, 'email' | 'password'> {}
