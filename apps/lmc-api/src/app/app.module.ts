import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_INTERCEPTOR} from '@nestjs/core';

import {classes} from '@automapper/classes';
import {AutomapperModule} from '@automapper/nestjs';
import {environment} from '../environments/environment';

import {APIResponseFormatter, AuthModule} from '@lmc/nest-shared';
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
			synchronize: environment.PRODUCTION !== true.toString(), //? should be turned off in production (overrides data)
		}),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		AuthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: APIResponseFormatter,
		},
	],
})
export class AppModule {}
