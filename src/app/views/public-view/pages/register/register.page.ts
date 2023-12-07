import {NgIf} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	inject,
} from '@angular/core';
import {AuthService} from '@core';
import {
	CardComponent,
	FormComponent,
	ButtonComponent,
} from '@shared/components';

@Component({
	standalone: true,
	imports: [NgIf, CardComponent, FormComponent, ButtonComponent],
	templateUrl: './register.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content bg-accent';

	protected readonly register = inject(AuthService).signUp;
	protected readonly fields = [
		{preset: 'user.email', props: {required: true}},
		{
			preset: 'user.password',
			props: {
				required: true,
				attributes: {
					autocomplete: 'new-password',
				},
			},
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
	protected readonly navigationLinks = [
		{path: 'register', name: "S'inscrire"},
		{path: 'forgot-password', name: 'Mot de passe oublié ?'},
	];

	protected emailSent = false;
}
