import {Routes} from '@angular/router';
import {PublicView} from './public.view';

/**
 * Views for unauthenticated users.
 */
export const PUBLIC_ROUTES: Routes = [
	{
		path: '',
		component: PublicView,
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: () =>
					import('./pages/home/home.page').then(m => m.HomePage),
			},
			{
				path: 'method',
				loadComponent: () =>
					import('./pages/method/method.page').then(m => m.MethodPage),
			},
			{
				path: 'about',
				loadComponent: () =>
					import('./pages/about/about.page').then(m => m.AboutPage),
			},
			{
				path: 'login',
				loadComponent: () =>
					import('./pages/login/login.page').then(m => m.LoginPage),
			},
			{
				path: 'register',
				loadComponent: () =>
					import('./pages/register/register.page').then(m => m.RegisterPage),
			},
			{
				path: 'forgot-password',
				loadComponent: () =>
					import('./pages/forgot-password/forgot-password.page').then(
						m => m.ForgotPasswordPage
					),
			},
			{
				path: 'reset-password',
				loadComponent: () =>
					import('./pages/reset-password/reset-password.page').then(
						m => m.ResetPasswordPage
					),
			},
			{
				path: 'faq',
				loadComponent: () =>
					import('@shared/components/pages/faq.page').then(m => m.FaqPage),
			},
			{
				path: 'inactive-account/:email',
				loadComponent: () =>
					import('./pages/inactive-account/inactive-account.page').then(
						m => m.InactiveAccountPage
					),
			},
		],
	},
];
