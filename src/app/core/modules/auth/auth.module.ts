import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthResource} from './resources/auth.resource';
import {TokenStore, UserStore} from './stores';

/**
 * Provides a set a services to handle user authentication.
 *
 * It also provide a custom HTTP_INTERCEPTORS that intercept request to enable
 * authenticated requests. (More information in `TokenInterceptor` JSDoc).
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	providers: [
		AuthService,
		AuthResource,
		TokenStore,
		UserStore,
		{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
	],
})
export class AuthModule {}
