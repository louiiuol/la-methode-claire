import {AbstractControl} from '@angular/forms';

/**
 * Checks if `password` and `passwordConfirm` are given and the same.
 * @param control input field to be checked
 * @returns ValidatorFn used by FormGroup to validate form state
 */
export function passwordMatchValidator(control: AbstractControl) {
	if (control.value) {
		const {password, passwordConfirm} = control.value;

		// avoid displaying the message error when values are empty
		if (!passwordConfirm || !password || passwordConfirm === password) {
			return null;
		}
	}
	return {passwordMatch: false};
}
