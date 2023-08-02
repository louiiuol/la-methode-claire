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
			},
		},
		{
			key: 'password',
			validators: [getPattern('password')],
			props: {
				type: 'password',
			},
		},
		{
			key: 'passwordConfirm',
			props: {
				type: 'password',
			},
		},
		{
			key: 'agree',
			type: 'checkbox',
			defaultValue: false,
		},
		{
			key: 'firstName',
			validators: [Validators.min(1), Validators.max(100)],
			props: {
				type: 'text',
			},
		},
		{
			key: 'lastName',
			validators: [Validators.min(1), Validators.max(100)],
			props: {
				type: 'text',
			},
		},
	],
};
