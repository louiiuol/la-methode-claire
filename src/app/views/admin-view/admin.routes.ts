import {Routes} from '@angular/router';
import {AdminView} from './admin.view';

/**
 * Views for authenticated users.
 */
export const ADMIN_ROUTES: Routes = [
	{
		path: '',
		component: AdminView,
		children: [
			{
				path: 'dashboard',
				pathMatch: 'full',
				loadComponent: () =>
					import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
			},
		],
	},
];
