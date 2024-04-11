import {Component, HostBinding, inject} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

import {
	FormComponent,
	ButtonComponent,
	LoaderComponent,
} from '@shared/components';
import {AuthService, FieldConfig} from '@core';
import {PasswordModule, PasswordService} from '@shared/modules/password';

/**
 * Profile View, allows user to see and update their information
 */
@Component({
	standalone: true,
	imports: [
    AsyncPipe,
    FormComponent,
    ButtonComponent,
    LoaderComponent,
    MatExpansionModule,
    PasswordModule
],
	templateUrl: './profile.page.html',
})
export class ProfilePage {
	@HostBinding('class') class = 'page p-6';

	// Profile form
	protected readonly model$ = this.authenticator.getProfile();
	protected readonly profileFields: FieldConfig[] = [
		{preset: 'user.email'},
		{preset: 'user.firstName'},
		{preset: 'user.lastName'},
	];

	// Password Form
	protected readonly passwordFields: FieldConfig[] = [
		{preset: 'user.password', props: {required: true}},
		{preset: 'user.passwordConfirm', props: {required: true}},
	];
	protected passwordValidators = ['passwordMatch'];
	protected readonly updatePassword = inject(PasswordService).updatePassword;

	// Newsletter form
	protected readonly newsletterField = [
		{preset: 'user.newsletter', props: {required: true}},
	];

	constructor(private readonly authenticator: AuthService) {}

	protected updateProfile = this.authenticator.updateProfile;
	protected closeAccount = () => this.authenticator.closeAccount();
}
