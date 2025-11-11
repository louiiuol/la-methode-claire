export * from './auth';
export * from './form';
export * from './http';
export * from './platform';
export * from './storage';

import {AuthModule} from './auth/auth.module';
import {FormModule} from './form/form.module';
import {HttpModule} from './http/http.module';
import {PlatformModule} from './platform/platform.module';
import {StorageModule} from './storage/storage.module';

export {AuthModule, FormModule, HttpModule, PlatformModule, StorageModule};

export const CORE_MODULES = [
	StorageModule,
	PlatformModule,
	HttpModule,
	FormModule,
	AuthModule,
];
