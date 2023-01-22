import {AutoMap} from '@automapper/classes';

export class UserViewDto {
	@AutoMap()
	uuid!: string;

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
