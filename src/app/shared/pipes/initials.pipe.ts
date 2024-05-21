import {Pipe, PipeTransform} from '@angular/core';
import {nullish} from '@core/helpers/types';

/**
 * Formats initials from given user based on their information:
 * If no fistName nor lastName was provided, method will returns email's first letter.
 * Otherwise, will return the first letters of the firstName and lastName.
 *
 * @author louiiuol
 */
@Pipe({
	standalone: true,
	name: 'initials',
})
export class InitialsPipe implements PipeTransform {
	transform(
		user:
			| {email: string; firstName: string | nullish; lastName: string | nullish}
			| nullish
	): string {
		if (!user) return '--';
		const name =
			user.firstName && user.lastName
				? user.firstName.charAt(0) + user.lastName.charAt(0)
				: user.email.charAt(0);
		return name.toLocaleUpperCase();
	}
}
