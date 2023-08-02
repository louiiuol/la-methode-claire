import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	forwardRef,
	inject,
} from '@angular/core';
import {AuthService, TranslateModule} from '@core';
import {
	CardComponent,
	FormComponent,
	ButtonComponent,
} from '@shared/components';

@Component({
	standalone: true,
	imports: [
		CardComponent,
		FormComponent,
		ButtonComponent,
		forwardRef(() => TranslateModule),
	],
	templateUrl: './register.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content';

	protected readonly register = inject(AuthService).signUp;
	protected readonly fields = [
		{preset: 'user.email', props: {required: true}},

		{
			preset: 'user.password',
			props: {required: true},
			className: 'inline-block w-1/2',
		},
		{
			preset: 'user.passwordConfirm',
			props: {required: true},
			className: 'inline-block w-1/2',
		},

		{preset: 'user.agree', props: {required: true}},
	];
	protected readonly validators = ['passwordMatch'];
	protected readonly navigationLinks = ['register', 'forgot_password'];
}
