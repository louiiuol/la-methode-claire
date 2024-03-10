import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

/**
 * Provides Guard to validate access to unrestricted routes (public level):
 * * Automatically redirect user to their dashboard if they are logged in
 *
 * @author louiiuol
 */
export const VisitorGuard = () => {
	const router = inject(Router);
	return inject(AuthService).isLoggedIn()
		? router
				.navigate(['/app/dashboard'])
				.catch(err =>
					console.error('[TeacherGuard] Failed to navigate to [Login]', err)
				)
		: true;
};
