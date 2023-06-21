import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, iif, of} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

import {TokenStore, UserStore} from '../stores';
import {LoginDto, RegisterDto} from '../types';
import {AuthResource} from '../resources/auth.resource';
import {CurrentUser} from '../models/current-user.model';
import {UserPreviewDto} from '@shared/modules';

/**
 * Provides methods and properties to handle current user's state in the application:
 *
 * - <strong>currentUser</strong> provides a BehaviorSubject's value (that updates over time) which contains current user global information
 * - <strong>isLoggedIn$</strong> observable allow you to easily know if user is logged in and keep track of this information over time
 *
 * <em>These two properties provides the base tools for reactive programmation in the rest of the application.</em>
 *
 * This service also exports a couple of methods:
 * - <strong>signUp()</strong> creates a new user
 * - <strong>logIn()</strong> and <strong>logOut()</strong> toggles currentUser state
 * - <strong>hasRoles(roles: UserRole[])</strong> checks if current user has given roles
 *
 * <strong>Note</strong> This services uses internally stores (TokenStore and UserStore) to keep user informations in browser refresh.
 * If user refresh the page, currentUser will be initialized with browser storage values.
 */
@Injectable()
export class AuthService {
	private readonly currentUser$ = new BehaviorSubject<CurrentUser | null>(
		this.userStore.getUser()
	);
	readonly currentUser = this.currentUser$.value;
	readonly isLoggedIn$ = this.currentUser$.pipe(map(user => !!user?.uuid));

	constructor(
		private readonly http: AuthResource,
		private readonly router: Router,
		private readonly tokenStore: TokenStore,
		private readonly userStore: UserStore
	) {}

	/**
	 * Tries to register the user with given information:
	 * - if the request is successful, the user must confirm his email, so no actions follow.
	 * - If an error occurred, user will be notified with explaining notification.
	 */
	signUp = (info: RegisterDto) =>
		this.http.signUp(info).pipe(
			tap(res => {
				if (!res.error) {
					this.router
						.navigate(['/login'])
						.catch(err =>
							console.error('Failed to Redirect to [LoginPage]', err)
						);
				}
			})
		);

	/**
	 * Tries to authenticate the user with given credentials:
	 * - if the request is successful, the session start and user is redirect to his dashboard
	 * - If an error occurred, the LoginComponent will take car of displaying the error messages.
	 */
	logIn = (dto: LoginDto) =>
		this.http.logIn(dto).pipe(
			map(res => {
				if (!res.error) this.tokenStore.saveToken(res.value?.accessToken);
				else res.error = ['Invalid credentials.'];
				return res;
			}),
			mergeMap(v => iif(() => !!v.value, this.http.whoAmI(), of(v))),
			tap(res => {
				if ((res?.value as UserPreviewDto)?.uuid) {
					this.updateCurrentUser(new CurrentUser(res.value as UserPreviewDto));
					this.router
						.navigate(['/dashboard'])
						.catch(err =>
							console.error('Failed to Redirect to [Dashboard]', err)
						);
				}
			})
		);

	/**
	 * Clears current user's session and redirect to homepage
	 * - Clears Cookie & LocalStorage information
	 * - Clear currentUser value
	 * - Redirect to '/' (homepage)
	 */
	logOut = (): void => {
		this.tokenStore.clearToken();
		this.userStore.clearUser();
		this.currentUser$.next(null);
		this.router
			.navigate(['/'])
			.catch(err => console.error('Failed to Redirect to [Dashboard]', err));
	};

	/**
	 * Checks if current user has given role(s)
	 * @param roles to be checked
	 * @returns true if currentUser has at least one of the given roles, false otherwise
	 */
	isAdmin = (): boolean => this.currentUser$.value?.role === 'ADMIN';

	/**
	 * Updates current user in local storage and observable shared between components and services.
	 * @param user entity to be stored
	 */
	private updateCurrentUser = (user: CurrentUser): void =>
		this.currentUser$.next(this.userStore.saveUser(user));
}
