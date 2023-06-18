/**
 * DTO representing user credentials for future request.
 */
export interface Token {
	/**
	 * JWT token needed to request on authenticated resources
	 */
	readonly accessToken: string;
}
