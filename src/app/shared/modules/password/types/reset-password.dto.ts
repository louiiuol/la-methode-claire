export interface ResetPasswordDto {
	token: string;
	password: string;
	passwordConfirm: string;
}

export interface ResetPasswordApiDto {
	password: string;
	_password: string;
}
