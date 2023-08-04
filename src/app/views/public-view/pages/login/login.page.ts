import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	forwardRef,
	inject,
} from '@angular/core';

import {
	FormComponent,
	CardComponent,
	ButtonComponent,
} from '@shared/components';
import {AuthService, TranslateModule, FieldConfig} from '@core';

/**
 * Login View, allows user to enter their credentials to authenticate and access
 * their dashboard. The view integrate a form to submit user credentials
 * @see {@link AuthService} login() method for more information
 */
@Component({
	standalone: true,
	imports: [
		CardComponent,
		FormComponent,
		ButtonComponent,
		forwardRef(() => TranslateModule),
	],
	templateUrl: './login.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content';

	protected readonly fields: FieldConfig[] = [
		{preset: 'user.email', props: {required: true}},
		{
			preset: 'user.password',
			validators: [],
			props: {required: true, attributes: {autocomplete: 'on'}},
		},
	];
	protected readonly logIn = inject(AuthService).logIn;

	protected readonly navigationLinks = ['register', 'forgot-password'];
}