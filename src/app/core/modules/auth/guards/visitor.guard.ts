import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs';
import {AuthService} from '../services/auth.service';

/**
 * Provides Guard to validate access to unrestricted routes (public level):
 * * Automatically redirect user to their dashboard if they are logged in
 *
 * @author louiiuol
 */
export const VisitorGuard = () => {
	const router = inject(Router);
	return inject(AuthService).isLoggedIn$.pipe(
		map(logged => (logged ? router.navigate(['/app']) : true))
	);
};
