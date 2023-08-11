import {NgIf} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	inject,
} from '@angular/core';
import {FieldConfig, TranslatePipe} from '@core';
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
		NgIf,
		CardComponent,
		FormComponent,
		ButtonComponent,
		TranslatePipe,
		PasswordModule,
	],
	templateUrl: './forgot-password.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
	@HostBinding('class')
	protected readonly class = 'centered-content';

	protected readonly fields: FieldConfig[] = [
		{preset: 'user.email', props: {required: true}},
	];
	protected readonly forgotPassword = inject(PasswordService).forgotPassword;
	protected readonly navigationLinks = ['register', 'login'];

	protected emailSent = false;
}
