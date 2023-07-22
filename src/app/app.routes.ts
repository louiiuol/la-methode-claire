import {Routes} from '@angular/router';
import {VisitorGuard, CustomerGuard} from '@core/modules/auth/guards';

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
	// {
	// 	path: 'app',
	// 	canActivate: [CustomerGuard],
	// 	loadChildren: () =>
	// 		import('./views/customer/customer.module').then(m => m.CustomerModule),
	// },
];
