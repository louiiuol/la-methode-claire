import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	inject,
} from '@angular/core';

import {
	FormComponent,
	CardComponent,
	ButtonComponent,
} from '@shared/components';
import {AuthService, FieldConfig} from '@core';

/**
 * Login View, allows user to enter their credentials to authenticate and access
 * their dashboard. The view integrate a form to submit user credentials
 * @see {@link AuthService} login() method for more information
 */
@Component({
	standalone: true,
	imports: [CardComponent, FormComponent, ButtonComponent],
	templateUrl: './login.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content bg-primary';

	protected readonly fields: FieldConfig[] = [
		{preset: 'user.email', props: {required: true}},
		{
			preset: 'user.password',
			props: {required: true, attributes: {autocomplete: 'on'}},
		},
	];
	protected readonly logIn = inject(AuthService).logIn;

	protected readonly navigationLinks = ['register', 'forgot-password'];
}
