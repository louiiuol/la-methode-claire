import {Module} from '@nestjs/common';
import {classes} from '@automapper/classes';
import {AutomapperModule} from '@automapper/nestjs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from '../environments/environment';
import {UsersModule} from './users/users.module';
import {User} from '@lmc/api-interfaces';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: environment.DATABASE_HOST,
			port: parseInt(environment.DATABASE_PORT, 10),
			username: environment.DATABASE_USER,
			password: environment.DATABASE_PASSWORD,
			database: environment.DATABASE_NAME,
			entities: [User],
			synchronize: environment.PRODUCTION !== 'true', //? should be turned off in production (overrides data)
		}),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
