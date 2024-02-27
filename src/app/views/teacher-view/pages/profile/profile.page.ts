import {Component, HostBinding, forwardRef, inject} from '@angular/core';

import {AsyncPipe, NgIf} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

import {FormComponent, ButtonComponent} from '@shared/components';
import {AuthService, FieldConfig} from '@core';
import {PasswordModule, PasswordService} from '@shared/modules/password';

const MaterialModules = [MatExpansionModule];

/**
 * Profile View, allows user to see and update their information
 */
@Component({
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		FormComponent,
		ButtonComponent,
		...MaterialModules,
		forwardRef(() => PasswordModule),
	],
	templateUrl: './profile.page.html',
})
export class ProfilePage {
	@HostBinding('class')
	protected readonly class = 'page p-6';

	protected readonly profileFields: FieldConfig[] = [
		{preset: 'user.email'},
		{preset: 'user.firstName'},
		{preset: 'user.lastName'},
	];

	protected readonly passwordFields: FieldConfig[] = [
		{preset: 'user.password', props: {required: true}},
		{preset: 'user.passwordConfirm', props: {required: true}},
	];

	protected readonly newsletterField = [
		{preset: 'user.newsletter', props: {required: true}},
	];

	protected readonly updatePassword = inject(PasswordService).updatePassword;
	protected passwordValidators = ['passwordMatch'];

	protected readonly model$ = this.authenticator.getProfile();
	protected readonly updateProfile = this.authenticator.updateProfile;

	constructor(private readonly authenticator: AuthService) {}

	closeAccount = () => this.authenticator.closeAccount();
}
