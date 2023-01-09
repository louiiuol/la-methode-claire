/**
 * Entry point of the API, this launch is loaded in order to run server with specified modules/configuration.
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {GlobalExceptionFilter} from './app/core/exceptions/global-exceptions.filter';
import {environment} from './environments/environment.prod';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new GlobalExceptionFilter());
	const globalPrefix = environment.API_PREFIX;
	app.setGlobalPrefix(globalPrefix);
	const port = environment.API_PORT || 3333;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://${environment.API_HOST}:${port}/${globalPrefix}`
	);
}

bootstrap();
