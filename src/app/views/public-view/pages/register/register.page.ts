import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
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
	imports: [CardComponent, FormComponent, ButtonComponent, TranslateModule],
	templateUrl: './register.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
	@HostBinding('class')
	protected readonly class = 'centered-content';

	protected readonly register = inject(AuthService).signUp;
	protected readonly fields = [
		{preset: 'user.email', props: {required: true}},
		{preset: 'user.password', props: {required: true}},
		{preset: 'user.passwordConfirm', props: {required: true}},
		{preset: 'user.agree', props: {required: true}},
	];
	protected readonly validators = ['passwordMatch'];
	protected readonly navigationLinks = ['register', 'forgot_password'];
}
