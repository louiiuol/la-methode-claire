import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {tap} from 'rxjs';
import {AuthService} from '../services/auth.service';

/**
 * Provides Guard to validate access to restricted routes (Logged admin level):
 * * If user is not logged, they will be redirected to `/` (Home)
 * * If user is logged, but they don't have admin roles, they will be redirected to `/dashboard` (Customer View)
 * * If user is admin, (hasRoles(`'ROLE_VIDMIZER', 'ROLE_DEV'`)), they can access route (admin's back-office)
 */
export const AdminGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authService = inject(AuthService);
	return authService.isLoggedIn$.pipe(
		tap(logged => {
			if (!logged) {
				router
					.navigate(['/'])
					.catch(err => console.error('Failed to redirect ', err));
				return false;
			}
			const isAdmin = authService.isAdmin();
			if (!isAdmin) {
				router
					.navigate(['dashboard'])
					.catch(err => console.error('Failed to redirect ', err));
			}
			return isAdmin;
		})
	);
};
