export interface PasswordResetDto {
	token: string;
	password: string;
	passwordConfirm: string;
}

export interface PasswordResetApiDto {
	password: string;
	_password: string;
}
