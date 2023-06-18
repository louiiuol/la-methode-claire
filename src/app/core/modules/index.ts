export * from './auth';
export * from './platform';
export * from './http';
export * from './notification';
export * from './platform';
export * from './storage';
export * from './translation';
export * from './form';

import {AuthModule} from './auth/auth.module';
import {FormModule} from './form/form.module';
import {HttpModule} from './http/http.module';
import {NotificationModule} from './notification/notification.module';
import {PlatformModule} from './platform/platform.module';
import {StorageModule} from './storage/storage.module';
import {TranslateModule} from './translation/translate.module';

export {
	AuthModule,
	FormModule,
	HttpModule,
	NotificationModule,
	PlatformModule,
	StorageModule,
	TranslateModule,
};
export const CORE_MODULES = [
	StorageModule,
	PlatformModule,
	HttpModule,
	TranslateModule,
	NotificationModule,
	FormModule,
	AuthModule,
];
