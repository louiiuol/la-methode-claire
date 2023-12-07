import {Routes} from '@angular/router';
import {VisitorGuard, TeacherGuard} from '@core/modules/auth/guards';

/**
 * Global Routes of the application, defines all root sections:
 * - Public (not logged users)
 * - Customer (Teachers dashboard)
 * - Admin (Anne & Claire's dedicated dashboard)
 */
export const APP_ROUTES: Routes = [
	{
		path: '',
		canActivate: [VisitorGuard],
		loadChildren: () =>
			import('./views/public-view/public.module').then(m => m.PublicModule),
	},
	{
		path: 'app',
		canActivate: [TeacherGuard],
		loadChildren: () =>
			import('./views/teacher-view/teacher.module').then(m => m.TeacherModule),
	},
];

export const navigationLinks = {
	public: [
		{path: '', name: 'Accueil'},
		{path: 'method', name: 'La méthode'},
		{path: 'about', name: 'Qui est claire ?'},
	],
	logged: [
		{path: 'app/dashboard', name: 'Tableau de bord'},
		{path: 'app/subscription', name: 'La formule'},
	],
};
