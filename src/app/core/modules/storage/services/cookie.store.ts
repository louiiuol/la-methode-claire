import {Injectable} from '@angular/core';

@Injectable()
/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
export class CookieStore {
	/**
	 * Checks the existence of a single cookie by it's field name
	 */
	check(name: string): boolean {
		// Check if document exist avoiding issues on server side pre-rendering
		if (typeof document === 'undefined') {
			return false;
		}
		name = encodeURIComponent(name);

		const regexp = new RegExp(`(?:^${name}|;\\s*${name})=(.*?)(?:;|$)`, 'g');
		return regexp.test(document.cookie);
	}

	/**
	 * Retrieves a single cookie by it's name
	 */
	get(name: string): string {
		if (this.check(name)) {
			name = encodeURIComponent(name);
			const regexp = new RegExp(`(?:^${name}|;\\s*${name})=(.*?)(?:;|$)`, 'g');
			const result = regexp.exec(document.cookie);
			return result ? decodeURIComponent(result[1]) : '';
		} else {
			return '';
		}
	}

	/**
	 * Retrieves a a list of all cookie available
	 * @returns Object with all Cookies
	 */
	getAll(): any {
		const cookies: any = {};

		if (document.cookie && document.cookie !== '') {
			const split = document.cookie.split(';');
			for (const s of split) {
				const currCookie = s.split('=');
				currCookie[0] = currCookie[0].replace(/^ /, '');
				cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(
					currCookie[1]
				);
			}
		}

		return cookies;
	}

	/**
	 * Save the Cookie
	 */
	set(
		name: string,
		value: string,
		expires?: number | Date,
		path = '',
		domain = '',
		secure = true
	): void {
		let cookieStr =
			encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

		if (expires) {
			if (typeof expires === 'number') {
				const dtExpires = new Date(new Date().getTime() + expires);
				cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
			} else {
				cookieStr += 'expires=' + expires.toUTCString() + ';';
			}
		}

		if (!path) {
			path = '/';
		}
		cookieStr += 'path=' + path + ';';
		if (domain) {
			cookieStr += 'domain=' + domain + ';';
		}
		if (secure) {
			cookieStr += 'secure;';
		}
		document.cookie = cookieStr;
	}

	/**
	 * Removes specified Cookie
	 */
	delete(name: string, path?: string, domain?: string): void {
		this.set(name, '', -1, path, domain);
	}

	/**
	 * Delete all cookie available
	 */
	deleteAll(path?: string, domain?: string): void {
		const cookies: any = this.getAll();
		for (const cookieName of Object.keys(cookies)) {
			this.delete(cookieName, path, domain);
		}
	}
}
