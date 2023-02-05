import {AutoMap} from '@automapper/classes';
import {User} from '@lmc/api-interfaces';

export class UserGoogle extends User {
	@AutoMap()
	picture!: string;

	@AutoMap()
	locale!: string;

	@AutoMap()
	provider!: string;

	@AutoMap()
	accessToken!: string;

	@AutoMap()
	refreshToken!: string;

	_json: any;
}
