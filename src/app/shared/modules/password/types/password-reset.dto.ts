export interface PasswordResetDto {
	user: string;
	token: string;
	password: string;
	passwordConfirm: string;
}

export interface PasswordResetApiDto {
	token: string;
	password: string;
}
