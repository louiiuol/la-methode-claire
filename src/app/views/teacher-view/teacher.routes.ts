import {Routes} from '@angular/router';
import {TeacherView} from './teacher.view';

/**
 * Views for authenticated users.
 */
export const TEACHER_ROUTES: Routes = [
	{
		path: '',
		component: TeacherView,
		children: [
			{
				path: 'dashboard',
				pathMatch: 'full',
				loadComponent: () =>
					import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
			},
			{
				path: 'profile',
				loadComponent: () =>
					import('./pages/profile/profile.page').then(m => m.ProfilePage),
			},
			{
				path: 'subscription',
				loadComponent: () =>
					import('./pages/subscription/subscription.page').then(
						m => m.SubscriptionPage
					),
			},
		],
	},
];
