import {UserRole} from './user-role.enum';

/**
 * Representation of an User entity in database.
 *
 * This interface can be used to compose DTOs.
 */
export interface User {
	email: string;
	firstName: string | null;
	isActive: boolean;
	currentLessonIndex: number;
	lastName: string | null;
	password: string;
	role: UserRole;
	uuid: string;
	subscribed: boolean;
	createdAt: Date;
	updatedAt: Date;
	lastConnection: Date;
	closed: boolean;
	closedAt: Date;
	newsletter: boolean;
}
