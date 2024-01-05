import {Validators} from '@angular/forms';
import {getPattern} from './patterns';
import {FieldConfig} from '../types';

/**
 * Application Form Groups defining FormlyField configuration:
 * * Translated name
 * * Custom patterns and requirement (please check `formlyValidationConfig()` and `FORM_PATTERNS` before creating new validation)
 *
 * Fields are groups inside an array name after API resources (users, videos, ...)
 * and each field must have an unique key !
 *
 * @see https://formly.dev/docs/guide/formly-field-presets
 * @see https://formly.dev/docs/guide/custom-formly-field
 */
export const APP_FORM_GROUPS: {[key: string]: FieldConfig[]} = {
	user: [
		{
			key: 'email',
			validators: [Validators.email],
			props: {
				type: 'email',
				placeholder: 'example@mail.com',
				label: 'Adresse email',
			},
		},
		{
			key: 'password',
			validators: [getPattern('password')],
			props: {
				type: 'password',
				label: 'Mot de passe',
				description: 'Doit être un mot de passe sécurisé',
				placeholder: '******',
			},
		},
		{
			key: 'passwordConfirm',
			props: {
				type: 'password',
				label: 'Confirmation du mot de passe',
				description: 'Doit être identique au mot de passe',
				placeholder: '******',
			},
		},
		{
			key: 'agree',
			type: 'checkbox',
			defaultValue: false,
			props: {
				label: "Je confirme avoir lu les conditions d'utilisation",
				description:
					"Vous devez accepter les conditions d'utilisation pour vous inscrire",
			},
		},
		{
			key: 'newsletter',
			type: 'checkbox',
			defaultValue: false,
			props: {
				label: "Je souhaite m'abonner à la newsletter",
				description:
					'En vous abonnant, vous aurez accès à du contenu exclusif.',
			},
		},
		{
			key: 'firstName',
			validators: [Validators.min(1), Validators.max(100)],
			props: {
				type: 'text',
				label: 'Prénom',
				placeholder: 'Jean',
				description: '',
			},
		},
		{
			key: 'lastName',
			validators: [Validators.min(1), Validators.max(100)],
			props: {
				type: 'text',
				label: 'Nom',
				placeholder: 'Dupont',
				description: '',
			},
		},
	],
};
