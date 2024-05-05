
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	inject,
} from '@angular/core';
import {FieldConfig} from '@core';
import {
	CardComponent,
	FormComponent,
	ButtonComponent,
} from '@shared/components';
import {PasswordService, PasswordModule} from '@shared/modules/password';

/**
 * Forgot password form, allows user to enter their credential to receive a email that
 * will allow user to reset their password.
 */
@Component({
	standalone: true,
	imports: [
    CardComponent,
    FormComponent,
    ButtonComponent,
    PasswordModule
],
	templateUrl: './forgot-password.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content bg-yellow-light';

	protected readonly fields: FieldConfig[] = [
		{preset: 'user.email', props: {required: true}},
	];
	protected readonly forgotPassword = inject(PasswordService).forgotPassword;
	protected readonly navigationLinks = [
		{path: 'register', name: "s'inscrire"},
		{path: 'login', name: 'se connecter'},
	];

	protected emailSent = false;
}
