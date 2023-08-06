import {User, UserPreviewDto, UserRole} from '@shared/modules/users';

/**
 * Representation of current user logged in the app.
 * Gather common information about user like their role, permission, credits ..
 *
 * This class will be instantiated by `AuthService` when login is successful.
 * From there, instance will be available from `AuthService.currentUser` (which is a signal)
 *
 * @author louiiuol
 */
export class CurrentUser {
	email: string;
	firstName: string | null;
	initials: string;
	isAdmin: boolean;
	lastName: string | null;
	currentLesson: number;
	role: UserRole;
	uuid: string;
	hasValidSubscription = false;

	constructor(user: UserPreviewDto) {
		this.uuid = user.uuid;
		this.email = user.email;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.initials = this.formatInitials(user);
		this.isAdmin = user.role === 'ADMIN';
		this.role = user.role;
		this.currentLesson = user.currentLessonIndex;
	}

	private formatInitials(
		user: Pick<User, 'email' | 'firstName' | 'lastName'>
	): string {
		return user.firstName && user.lastName
			? user.firstName.charAt(0) + user.lastName.charAt(0)
			: user.email.charAt(0);
	}
}
