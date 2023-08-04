import {NgIf} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	computed,
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
	MessageComponent,
} from '@shared/components';
import {PasswordService, PasswordModule} from '@shared/modules/password';
import {ActivatedRoute} from '@angular/router';

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
		MessageComponent,
		forwardRef(() => TranslateModule),
		forwardRef(() => PasswordModule),
	],
	templateUrl: './reset-password.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
	@HostBinding('class')
	protected readonly class = 'centered-content';

	protected token = signal<string | null>(null);
	protected user = signal<string | null>(null);

	protected model = computed(() => ({token: this.token(), user: this.user()}));
	protected fields: FieldConfig[] = [
		{preset: 'user.password', props: {required: true}},
		{preset: 'user.passwordConfirm', props: {required: true}},
	];
	protected readonly resetPassword = inject(PasswordService).resetPassword;
	protected validators = ['passwordMatch'];
	protected readonly navigationLinks = ['register', 'login'];

	protected requestSent = signal(false);

	constructor(private activatedRoute: ActivatedRoute) {
		this.activatedRoute.queryParamMap.subscribe(params => {
			this.token.set(params.get('token'));
			this.user.set(params.get('user'));
		});
	}

	hideForm(valid: boolean) {
		this.requestSent.set(valid);
	}
}
