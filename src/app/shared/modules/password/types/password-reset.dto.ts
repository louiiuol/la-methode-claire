export interface PasswordResetDto {
	user: string;
	token: string;
	password: string;
	passwordConfirm: string;
}
