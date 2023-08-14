import {
	HttpRequest,
	HttpHandler,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '@env/environment';
import {ApiResponse} from '@core/modules/http';
import {TokenStore} from '../stores/token.store';
import {Router} from '@angular/router';
import {UserStore} from '../stores';

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
	private readonly userStore = inject(UserStore);
	private readonly router = inject(Router);

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
		if (this.tokenStore.checkToken() && req.url.includes(this.appUrlDomain))
			req = this.addHeader(req, this.tokenStore.getToken());
		return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
	}

	/**
	 * Checks if unauthorized request occurs (except for /login route which specific scenario handle in AuthService's login() method)
	 * If so, interceptor will log out currentUser and redirect him to login page
	 * @param err error response from the API
	 * @returns Observable explaining what went wrong with the request
	 */
	private handleAuthError(err: HttpErrorResponse): Observable<unknown> {
		if (
			(err.error as ApiResponse<null>)?.code === 401 &&
			err.url !== this.appUrlDomain + '/login'
		) {
			this.logOut();
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

	private logOut = () => {
		this.tokenStore.clearToken();
		this.userStore.clearUser();
		this.router
			.navigate(['/login'])
			.catch(err => console.error('Failed to Redirect to [Dashboard]', err));
	};
}
