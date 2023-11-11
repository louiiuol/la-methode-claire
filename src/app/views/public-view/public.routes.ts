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
				pathMatch: 'full',
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
				path: 'about',
				loadComponent: () =>
					import('./pages/about/about.page').then(m => m.AboutPage),
			},
			{
				path: 'method',
				loadComponent: () =>
					import('./pages/method/method.page').then(m => m.MethodPage),
			},
			// {
			// 	path: 'contact',
			// 	loadComponent: () =>
			// 		import('./pages/contact/contact.page').then(m => m.ContactPage),
			// },
		],
	},
];

export const navigationLinks = [
	'',
	'method',
	'about',
	// 'faq',
];
