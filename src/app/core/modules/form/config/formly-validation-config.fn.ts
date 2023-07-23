import {TranslateService as NgxTranslateService} from '@ngx-translate/core';

import {ConfigOption, FormlyFieldConfig} from '@ngx-formly/core';
import {getName} from '../models/patterns';
import {passwordMatchValidator} from '../validators/password-match.validator';

/**
 * Overrides Formly Validation config in order to display validation messages translated to customer
 * These messages need to be declared in translation files at `core.form.validation.{name}` with {name} equal to validation's name
 *
 * @internal
 * @param translate Service used to translate messages
 * @returns translated validationMessages
 *
 * @author louiiuol
 */
export function formlyValidationConfig(
	translator: NgxTranslateService
): ConfigOption {
	return {
		validators: [{name: 'passwordMatch', validation: passwordMatchValidator}],
		validationMessages: [
			{
				name: 'required',
				message() {
					return translator.stream('core.form.validation.required');
				},
			},
			{
				name: 'email',
				message() {
					return translator.instant('core.form.validation.email');
				},
			},
			{
				name: 'minLength',
				message(field: FormlyFieldConfig) {
					return translator.instant('core.form.validation.minLength', {
						min: (field as any).requiredLength,
						actual: (field as any).actualLength,
					});
				},
			},
			{
				name: 'maxLength',
				message(field: FormlyFieldConfig) {
					return translator.instant('core.form.validation.maxLength', {
						max: (field as any).requiredLength,
						actual: (field as any).actualLength,
					});
				},
			},
			{
				name: 'max',
				message(field: FormlyFieldConfig) {
					return translator.instant('core.form.validation.max', {
						max: (field as any).max,
					});
				},
			},
			{
				name: 'min',
				message(field: FormlyFieldConfig) {
					return translator.instant('core.form.validation.min', {
						min: (field as any).min,
					});
				},
			},
			{
				name: 'pattern',
				message(field: any) {
					return translator.instant('core.form.validation.pattern', {
						format: translator.instant(
							'core.form.patterns.' + getName(field.requiredPattern)
						),
					});
				},
			},
			{
				name: 'passwordMatch',
				message() {
					return translator.instant(
						'core.form.validation.password_not_matching'
					);
				},
			},
		],
	};
}
