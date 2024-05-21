import {
	HttpRequest,
	HttpHandler,
	HttpInterceptor,
	HttpClient,
	HttpErrorResponse,
} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {environment} from '@env/environment';
import {TokenStore} from '../stores/token.store';
import {Router} from '@angular/router';
import {UserStore} from '../stores';
import {Token} from '../types/token.dto';
import {ApiResponse} from '@core/modules/http';

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
	private readonly http = inject(HttpClient);

	private refreshingToken = false;
	private refreshTokenSubject: BehaviorSubject<string | null> =
		new BehaviorSubject<string | null>(null);

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
		let authReq = req;
		const token = this.tokenStore.getToken();
		if (
			!!token &&
			req.url.includes(this.appUrlDomain) &&
			!this.refreshingToken
		) {
			authReq = this.addHeader(req, token);
		}

		return next.handle(authReq).pipe(
			catchError(err => {
				const errorStatus = err.error?.code ?? err.code ?? err.status;
				if (
					err instanceof HttpErrorResponse &&
					!authReq.url.includes('auth/login') &&
					errorStatus === 401
				) {
					return this.handleAuthError(authReq, next);
				} else if (authReq.url.includes('auth/refresh') && errorStatus === 401)
					this.logOut();
				return throwError(() => err);
			})
		);
	}

	/**
	 * Checks if unauthorized request occurs (except for /login route which specific
	 * scenario handle in AuthService's login() method)
	 * If so, interceptor will log out currentUser and redirect him to login page
	 * @param err error response from the API
	 * @returns Observable explaining what went wrong with the request
	 */
	private handleAuthError(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<unknown> {
		if (!this.refreshingToken) {
			this.refreshingToken = true;
			this.refreshTokenSubject.next(null);
			const refreshToken = this.tokenStore.getRefreshToken();

			if (refreshToken) {
				return this.http
					.get<ApiResponse<Token>>(`${environment.root_url}/auth/refresh`, {
						headers: {Authorization: 'Bearer ' + refreshToken},
					})
					.pipe(
						tap(res => {
							if (res.code != 200) this.logOut();
						}),
						catchError(err => {
							this.logOut();
							return throwError(() => err);
						}),
						switchMap(res => {
							this.refreshingToken = false;
							const tokens = res.data as Token;
							this.tokenStore.saveAccessToken(tokens.accessToken);
							this.refreshTokenSubject.next(tokens.accessToken);
							return next.handle(this.addHeader(request, tokens.accessToken));
						})
					);
			} else {
				this.logOut();
			}
		}

		return this.refreshTokenSubject.pipe(
			filter(token => token !== null),
			take(1),
			switchMap(token => next.handle(this.addHeader(request, token)))
		);
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
		console.warn('Failed to refresh tokens, logging out.');
		this.refreshingToken = false;
		this.tokenStore.clearTokens();
		this.userStore.clearUser();
		this.router
			.navigate(['/login'])
			.catch(err => console.error('Failed to Redirect to [Login Page]', err));
	};
}
