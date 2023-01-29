import {INestApplication, Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {environment} from './environments/environment.prod';

import {AppModule} from './app/app.module';
import {ExceptionHandler} from './app/core/filters/exception-handler.filter';

const processName = 'NestApplication';

/**
 * Entry point of the API, this launch is loaded in order to run server w/
 * specified modules/configuration. This is not a production server yet!
 * This is only a minimal backend to get started.
 */
(async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new ExceptionHandler());
	configureServer(app);
})();

/**
 * Configure prefix, port, and cuple of settings for the server.
 * Also logs the server's init state to the console.
 * @param app - The NestJS application.
 */
async function configureServer(app: INestApplication) {
	const globalPrefix = environment.API_PREFIX;
	app.setGlobalPrefix(globalPrefix);
	const port = Number(environment.API_PORT);
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://${environment.API_HOST}:${port}/${globalPrefix}`,
		processName
	);
	if (environment.PRODUCTION !== 'true') {
		Logger.debug(
			`⚙️  Application is running in development mode !`,
			processName
		);
	}
}
