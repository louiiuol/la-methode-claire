import {Routes} from '@angular/router';
import {TeacherPage} from './teacher.page';

/**
 * Views for unauthenticated users.
 */
export const TEACHER_ROUTES: Routes = [
	{
		path: '',
		component: TeacherPage,
		children: [
			{
				path: 'dashboard',
				loadComponent: () =>
					import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
			},
			{
				path: 'profile',
				loadComponent: () =>
					import('./pages/profile/profile.page').then(m => m.ProfilePage),
			},
		],
	},
];
