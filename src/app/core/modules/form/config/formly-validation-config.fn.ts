import {ConfigOption} from '@ngx-formly/core';
import {getPatternDescription} from '../models/patterns';
import {passwordMatchValidator} from '../validators/password-match.validator';

/**
 * Overrides Formly Validation config in order to display validation messages
 * @internal
 * @returns Validation messages
 *
 * @author louiiuol
 */
export function formlyValidationConfig(): ConfigOption {
	return {
		validators: [{name: 'passwordMatch', validation: passwordMatchValidator}],
		validationMessages: [
			{
				name: 'required',
				message: 'Ce champ est requis!',
			},
			{
				name: 'email',
				message: "Format d'email invalide !",
			},
			{
				name: 'minLength',
				message(field: any) {
					return `Texte trop court (${field.actualLength}/${field.requiredLength} caractères) !`;
				},
			},
			{
				name: 'maxLength',
				message(field: any) {
					return `Texte trop long (${field.actualLength}/${field.requiredLength} caractères) !`;
				},
			},
			{
				name: 'max',
				message(field: any) {
					return `La valeur doit être inférieure à ${field.max} !`;
				},
			},
			{
				name: 'min',
				message(field: any) {
					return `La valeur doit être supérieure à ${field.min} !`;
				},
			},
			{
				name: 'pattern',
				message(field: any) {
					return `Format invalide; ${getPatternDescription(
						field.requiredPattern
					)} `;
				},
			},
			{
				name: 'passwordMatch',
				message: 'Le mot de passe est différent !',
			},
		],
	};
}
