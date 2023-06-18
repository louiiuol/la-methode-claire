import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

/**
 * Wrapper module for HttpClientModule
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	imports: [HttpClientModule],
})
export class HttpModule {}
