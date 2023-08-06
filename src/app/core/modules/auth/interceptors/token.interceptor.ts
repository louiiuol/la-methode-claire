import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '@env/environment';
import {TokenStore} from '../stores/token.store';
import {AuthService} from '../services/auth.service';

/**
 * Intercepts every HTTP requests made by the Application thanks to `HttpInterceptor`, and adds the following logic:
 * * If current user is logged in, clone every request with JWT header (once logged, users will only request protected resources)
 * * If API send 401 status, log out current user and redirect to login (refresh token not implemented yet)
 *
 * @author louiiuol
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private readonly appUrlDomain = environment.root_url;
	private readonly tokenStore = inject(TokenStore);

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (this.tokenStore.checkToken() && req.url.includes(this.appUrlDomain))
			req = this.addHeader(req, this.tokenStore.getToken());
		return next.handle(req).pipe(catchError(this.handleAuthError));
	}

	/**
	 * Checks if unauthorized request occurs (except for /login route which specific scenario handle in AuthService's login() method)
	 * If so, interceptor will log out currentUser and redirect him to login page
	 * @param err error response from the API
	 * @returns Observable explaining what went wrong with the request
	 */
	private handleAuthError(err: HttpErrorResponse): Observable<any> {
		if (
			this &&
			err.status === 401 &&
			err.url !== this.appUrlDomain + '/login'
		) {
			inject(AuthService).logOut();
			return of(err?.message); // or EMPTY may be appropriate here
		}
		return throwError(() => err);
	}

	/**
	 * Clones given request with, if not null, current token attached.
	 * @param req http request to be cloned
	 * @param token jwt to be added
	 * @returns new HttpRequest clone with bearer token injected
	 */
	private addHeader = (
		req: HttpRequest<any>,
		token: string | null
	): HttpRequest<any> =>
		req.clone(token ? {setHeaders: {Authorization: 'Bearer ' + token}} : {});
}
