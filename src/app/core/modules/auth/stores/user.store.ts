import {Injectable, inject} from '@angular/core';
import {LocalStore} from '../../storage';
import {CurrentUser} from '../models/current-user.model';

/**
 * Provides store in local to save, check, get or delete current user information
 * @author louiiuol
 */
@Injectable()
export class UserStore {
	private readonly localStorageKey = 'user';
	private readonly storage = inject(LocalStore);

	/**
	 * Store given user (remove old one if exists) in browser storage.
	 * @param user object to store
	 * @returns stored user
	 */
	saveUser = (user: CurrentUser) => {
		if (this.isCurrentUserStored()) {
			this.clearUser();
		}
		this.storage.set(this.localStorageKey, user);
		return user;
	};

	/**
	 * Retrieves current user's information and return them, if found
	 * @returns CurrentUser object if one was found in storage
	 */
	getUser = (): CurrentUser | null =>
		this.isCurrentUserStored()
			? JSON.parse(this.storage.get(this.localStorageKey))
			: null;

	/**
	 * Removes current user's information from storage
	 */
	clearUser = (): void => this.storage.clear(this.localStorageKey);

	private isCurrentUserStored = (): boolean =>
		!!this.storage.get(this.localStorageKey);
}
