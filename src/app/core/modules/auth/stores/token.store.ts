import {Injectable} from '@angular/core';
import {CookieStore} from '@core/modules/storage/services';

/**
 * Provides store in cookies to save, check, get or delete user's token
 * @author louiiuol
 */
@Injectable()
export class TokenStore {
	private readonly accessCookieField = 'access_token';
	private readonly refreshCookieField = 'refresh_token';

	constructor(private readonly storage: CookieStore) {}

	/**
	 * Store given token (remove old one if exists) in browser storage.
	 * @param user object to store
	 * @returns stored token
	 */
	saveTokens = (
		input: {accessToken: string; refreshToken: string} | null | undefined
	): void => {
		if (input) {
			this.clearTokens();
			this.storage.set(
				this.accessCookieField,
				input.accessToken,
				this.parseJwt(input.accessToken)?.exp
			);

			this.storage.set(
				this.refreshCookieField,
				input.refreshToken,
				this.parseJwt(input.refreshToken)?.exp
			);
		}
	};

	saveAccessToken(token: string) {
		this.clearAccessToken();
		this.storage.set(this.accessCookieField, token, this.parseJwt(token)?.exp);
	}

	/**
	 * Retrieves current user's token and return it, if found
	 * @returns token as string
	 */
	checkToken = (): boolean => this.storage.check(this.accessCookieField);

	checkRefreshToken = (): boolean =>
		this.storage.check(this.refreshCookieField);

	/**
	 * Checks if token exists in document.cookies
	 * @returns True if token exists in storage, false otherwise
	 */
	getToken = () =>
		this.checkToken() ? this.storage.get(this.accessCookieField) : null;

	getRefreshToken = () =>
		this.checkRefreshToken() ? this.storage.get(this.refreshCookieField) : null;

	/**
	 * Removes token from storage
	 */
	clearTokens = (): void => {
		this.clearAccessToken();
		this.storage.delete(this.refreshCookieField);
	};

	clearAccessToken = () => this.storage.delete(this.accessCookieField);

	private parseJwt = (token?: string): {exp: number} | null => {
		if (!token) return null;
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	};
}
