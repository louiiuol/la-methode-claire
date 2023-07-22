import {Routes} from '@angular/router';
import {PublicPage} from './public.page';

/**
 * Views for unauthenticated users.
 */
export const PUBLIC_ROUTES: Routes = [
	{
		path: '',
		component: PublicPage,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./pages/home/home.page').then(m => m.HomePage),
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
				path: 'forgot_password',
				loadComponent: () =>
					import('./pages/forgot-password/forgot-password.page').then(
						m => m.ForgotPasswordPage
					),
			},
			{
				path: 'reset_password/:token',
				loadComponent: () =>
					import('./pages/reset-password/reset-password.page').then(
						m => m.ResetPasswordPage
					),
			},
			{
				path: 'contact',
				loadComponent: () =>
					import('./pages/contact/contact.page').then(m => m.ContactPage),
			},
		],
	},
];
