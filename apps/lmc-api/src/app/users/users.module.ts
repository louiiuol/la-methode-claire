import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {User} from '@lmc/api-interfaces';
import {UserProfile} from './user.profile';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService, UserProfile],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
