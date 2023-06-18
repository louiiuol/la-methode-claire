import {NgModule} from '@angular/core';
import {LocalStore, CookieStore} from './services';

/**
 * Wrapper module to store various informations in local storage or cookies' browser.
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	providers: [CookieStore, LocalStore],
})
export class StorageModule {}
