import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from '@core/core.module';
import {CORE_MODULES} from '@core/modules';

import {AppPage} from './app.page';
import {APP_ROUTES} from './app.routes';
import {ToasterComponent} from './views/layout/components/toast.component';

/**
 * Root module of this application.
 * - Defines global routes (public, customer, admin)
 * - Inject Core standalone services with CoreModule
 * - Inject Core modules (see src/app/core/modules for more details)
 *
 * <strong>To learn more on this application's architecture, this module has its own README !</strong>
 */
@NgModule({
	declarations: [AppPage],
	imports: [
		RouterModule.forRoot(APP_ROUTES, {
			bindToComponentInputs: true,
			useHash: true,
		}),
		CoreModule.forRoot(),
		...CORE_MODULES,
		ToasterComponent,
	],
	bootstrap: [AppPage],
})
export class AppModule {}
