/**
 * DTO representing user credentials for future request.
 */
export interface Token {
	/**
	 * JWT token needed to request on authenticated resources
	 */
	readonly accessToken: string;

	/**
	 * JWT refresh token needed to retrieve new token
	 */
	readonly refreshToken: string;
}
