import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	computed,
	forwardRef,
	inject,
	signal,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {FieldConfig} from '@core';
import {
	CardComponent,
	FormComponent,
	MessageComponent,
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
		MessageComponent,
		forwardRef(() => PasswordModule),
		MatButtonModule,
		RouterLink,
	],
	templateUrl: './reset-password.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content bg-yellow-light';

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
