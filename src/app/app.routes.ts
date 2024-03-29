import {Routes} from '@angular/router';
import {TeacherGuard, AdminGuard} from '@core/modules/auth/guards';

/**
 * Main routes available, grouped by spaces (logged or not, or as admin)
 */
export const navigationLinks = {
	public: [
		{path: '/method', name: 'La méthode'},
		{path: '/about', name: 'Qui est claire ?'},
	],
	logged: [
		{path: '/app/dashboard', name: 'tableau de bord'},
		{path: '/app/subscription', name: 'abonnement'},
		{path: '/app/profile', name: 'Profil'},
	],
	admin: [{path: '/back-office/dashboard', name: 'Back Office'}],
};

/**
 * Global Routes of the application, defines all root sections:
 * - Public (not logged users)
 * - Customer (Teachers dashboard)
 * - Admin (Anne & Claire's dedicated dashboard)
 */
export const APP_ROUTES: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./views/public-view/public.routes').then(m => m.PUBLIC_ROUTES),
	},
	{
		path: 'app',
		canActivate: [TeacherGuard],
		loadChildren: () =>
			import('./views/teacher-view/teacher.routes').then(m => m.TEACHER_ROUTES),
	},
	{
		path: 'back-office',
		canActivate: [AdminGuard],
		loadChildren: () =>
			import('./views/admin-view/admin.routes').then(m => m.ADMIN_ROUTES),
	},
];
