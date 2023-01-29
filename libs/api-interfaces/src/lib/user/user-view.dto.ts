import {AutoMap} from '@automapper/classes';
import {AbstractViewDTO} from '../utils/abstract-view.dto';

export class UserViewDto extends AbstractViewDTO {
	@AutoMap()
	email!: string;

	@AutoMap()
	firstName!: string;

	@AutoMap()
	lastName!: string;

	@AutoMap()
	isActive!: boolean;
}

export class UserUpdateDo extends UserViewDto {}
