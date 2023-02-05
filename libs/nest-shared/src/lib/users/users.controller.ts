import {Request, Controller, Get, UseGuards} from '@nestjs/common';
import {User, UserViewDto} from '@lmc/api-interfaces';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {UsersService} from './users.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller()
export class UsersController {
	constructor(
		@InjectMapper() private readonly classMapper: Mapper,
		private readonly usersService: UsersService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Request() req): Promise<UserViewDto> {
		const user = await this.usersService.findOneByEmail(req.user.email);
		console.log(user);
		return this.classMapper.map(user, User, UserViewDto);
	}

	// TODO Update user

	// TODO Close account (archive user)
}
