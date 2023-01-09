import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {User, UserCreateDto, UserViewDto} from '@lmc/api-interfaces';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		@InjectMapper() private readonly classMapper: Mapper
	) {}

	async save(user: UserCreateDto): Promise<UserViewDto> {
		const entity = await this.usersRepository.save(user);
		return this.classMapper.mapAsync(entity, User, UserViewDto);
	}

	findAll = (): Promise<User[]> => this.usersRepository.find();

	findOneByUuid = (uuid: number): Promise<User> =>
		this.usersRepository.findOneBy({uuid});

	findOneByEmail = (email: string): Promise<User> =>
		this.usersRepository.findOne({
			where: {email},
			// relations: {courses: true},
		});

	remove = async (id: string): Promise<DeleteResult> =>
		await this.usersRepository.delete(id);
}
