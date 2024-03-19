/**
 * DTO used to log in existing user
 *
 * Input of `POST /api/login`
 */
export interface LoginDto {
	email: string;
	password: string;
}
