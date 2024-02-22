import {Injectable, computed, signal} from '@angular/core';
import {Router} from '@angular/router';

import {iif, of} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

import {TokenStore, UserStore} from '@core/modules/auth/stores';
import {LoginDto, RegisterDto} from '@core/modules/auth/types';
import {AuthResource} from '@core/modules/auth/resources/auth.resource';
import {CurrentUser} from '@core/modules/auth/models/current-user.model';

import {UserPreviewDto} from '@shared/modules';
import {ProfileUpdateDto} from '@shared/modules/users/types/dtos/profile-update.dto';

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
 * <strong>Note</strong> This services uses internally stores (TokenStore and UserStore) to keep user informations in browser storage.
 * If user refresh the page, currentUser will be initialized with browser storage values.
 *
 * @author louiiuol
 */
@Injectable()
export class AuthService {
	readonly currentUser = signal(this.userStore.getUser());
	readonly isLoggedIn$ = computed(
		() => !!this.currentUser()?.uuid && this.tokenStore.checkToken()
	);

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
	signUp = (info: RegisterDto) => this.http.signUp(info);

	/**
	 * Tries to authenticate the user with given credentials:
	 * - if the request is successful, the session start and user is redirect to his dashboard
	 * - If an error occurred, the LoginComponent will take car of displaying the error messages.
	 */
	logIn = (dto: LoginDto) =>
		this.http.logIn(dto).pipe(
			map(res => {
				if (!res.error) this.tokenStore.saveToken(res.value?.accessToken);
				return res;
			}),
			mergeMap(v => iif(() => !!v.value, this.getProfile(), of(v))),
			tap(res => {
				if ((res?.value as UserPreviewDto)?.uuid) {
					this.updateCurrentUser(new CurrentUser(res.value as UserPreviewDto));
					this.router
						.navigate(['/app/dashboard'])
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
		this.currentUser.set(null);
		this.router
			.navigate(['/login'])
			.catch(err => console.error('Failed to Redirect to [Dashboard]', err));
	};

	getProfile = () => this.http.whoAmI();

	updateProfile = (dto: ProfileUpdateDto) => this.http.updateProfile(dto);

	/**
	 * Updates current user in local storage and observable shared between components and services.
	 * @param user entity to be stored
	 */
	updateCurrentUser = (user: Partial<CurrentUser>): void =>
		this.currentUser.set(
			this.userStore.saveUser(Object.assign({}, this.currentUser(), user))
		);

	closeAccount = () =>
		this.http.closeAccount().subscribe(res => {
			if (res.value) this.logOut();
		});
}
