import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	inject,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '@core';
import {CardComponent, FormComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [CardComponent, FormComponent, MatButtonModule, MatIcon],
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
			preset: 'user.firstName',
			className: 'inline-block w-1/2',
			props: {required: true},
		},
		{
			preset: 'user.lastName',
			className: 'inline-block w-1/2',
			props: {required: true},
		},
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
		{preset: 'user.newsletter', props: {required: true}},
	];
	protected readonly validators = ['passwordMatch'];
	protected readonly navigationLinks = [
		{path: 'register', name: "S'inscrire"},
		{path: 'forgot-password', name: 'Mot de passe oublié ?'},
	];

	protected emailSent = false;
}
