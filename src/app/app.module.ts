import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from '@core/core.module';
import {CORE_MODULES} from '@core/modules';

import {AppPage} from './app.page';
import {APP_ROUTES} from './app.routes';
import {ToasterComponent} from './shared/components';
import {environment} from '@env/environment';

/**
 * Root module of this application.
 * - Defines global routes (public, customer, admin)
 * - Inject Core standalone services with CoreModule
 * - Inject Core modules (see src/app/core/modules for more details)
 *
 * <strong>To learn more on this application's architecture, this module has its own README !</strong>
 *
 * @author louiiuol
 */
@NgModule({
	declarations: [AppPage],
	imports: [
		RouterModule.forRoot(APP_ROUTES, {
			bindToComponentInputs: true,
			useHash: environment.production,
			scrollPositionRestoration: 'top',
		}),
		CoreModule.forRoot(),
		...CORE_MODULES,
		ToasterComponent,
	],
	bootstrap: [AppPage],
})
export class AppModule {}
