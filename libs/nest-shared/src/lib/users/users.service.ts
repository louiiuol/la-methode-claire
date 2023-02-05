import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {User, UserCreateDto} from '@lmc/api-interfaces';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}

	save = async (user: UserCreateDto): Promise<User> =>
		await this.usersRepository.save(user);

	findAll = (): Promise<User[]> => this.usersRepository.find();

	findOneByUuid = (uuid: number): Promise<User> =>
		this.usersRepository.findOneBy({uuid});

	findOneByEmail = (email: string): Promise<User> =>
		this.usersRepository.findOne({
			where: {email},
		});

	remove = async (id: string): Promise<DeleteResult> =>
		await this.usersRepository.delete(id);
}
