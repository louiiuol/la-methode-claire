import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

/**
 * Provides Guard to validate access to restricted routes (Logged user level):
 * * If user is not logged, they will be redirected to `/login`
 * * If user is logged, he can access route (Customer View)
 *
 * @author louiiuol
 */
export const TeacherGuard = () => {
	const router = inject(Router);
	return !inject(AuthService).isLoggedIn()
		? router
				.navigate(['/login'])
				.catch(err =>
					console.error('[TeacherGuard] Failed to navigate to [Login]', err)
				)
		: true;
};
