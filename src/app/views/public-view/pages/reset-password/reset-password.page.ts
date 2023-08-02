import {NgIf} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	forwardRef,
	inject,
	signal,
} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
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
		NgIf,
		CardComponent,
		FormComponent,
		ButtonComponent,
		forwardRef(() => TranslateModule),
		forwardRef(() => PasswordModule),
	],
	templateUrl: './reset-password.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
	@Input({alias: 'token'}) tokenFromPath?: string; // Fetch token from route

	@HostBinding('class')
	protected readonly class = 'centered-content';

	protected fields: FieldConfig[] = [
		{preset: 'user.password', props: {required: true}},
		{preset: 'user.passwordConfirm', props: {required: true}},
	];
	protected readonly resetPassword = inject(PasswordService).resetPassword;
	protected validators = ['passwordMatch'];
	protected readonly navigationLinks = ['register', 'login'];
	protected token = signal(this.tokenFromPath);
}
