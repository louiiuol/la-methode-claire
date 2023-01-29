import {AutoMap} from '@automapper/classes';

export class AbstractViewDTO {
	@AutoMap()
	uuid!: string;
}
