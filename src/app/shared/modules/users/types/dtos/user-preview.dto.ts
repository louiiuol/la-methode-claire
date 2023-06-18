import {User} from '../user.entity';

/**
 * Minimal representation of an User (when displayed inside a list)
 */
export type UserPreviewDto = Omit<User, 'password'>;
