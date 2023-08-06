import {Injectable} from '@angular/core';
import {CookieStore} from '@core/modules/storage/services';

/**
 * Provides store in cookies to save, check, get or delete user's token
 * @author louiiuol
 */
@Injectable()
export class TokenStore {
	private readonly cookieFieldName = 'token';
	constructor(private readonly storage: CookieStore) {}

	/**
	 * Store given token (remove old one if exists) in browser storage.
	 * @param user object to store
	 * @returns stored token
	 */
	saveToken = (token: string | null | undefined): void => {
		if (token) {
			if (this.storage.check(this.cookieFieldName)) this.clearToken();
			this.storage.set(this.cookieFieldName, token, this.parseJwt(token)?.exp);
		}
	};

	/**
	 * Retrieves current user's token and return it, if found
	 * @returns token as string
	 */
	checkToken = (): boolean => this.storage.check(this.cookieFieldName);

	/**
	 * Checks if token exists in document.cookies
	 * @returns True if token exists in storage, false otherwise
	 */
	getToken = () =>
		this.checkToken() ? this.storage.get(this.cookieFieldName) : null;

	/**
	 * Removes token from storage
	 */
	clearToken = (): void => this.storage.delete(this.cookieFieldName);

	private parseJwt = (token?: string): {exp: number} | null => {
		if (!token) return null;
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	};
}
