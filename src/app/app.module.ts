import {NgModule, Component, HostBinding} from '@angular/core';
import {RouterModule} from '@angular/router';

import {environment} from '@env/environment';

import {CoreModule} from '@core/core.module';
import {CORE_MODULES} from '@core/modules';
import {ToasterComponent} from '@core/modules/notification';

/**
 * Root component of the Application, responsible for:
 * - Displaying "root" notifications to the user.
 * - Defining layout of application, in which views will be displayed.
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-root',
	template: `
		<app-toaster />
		<router-outlet />
	`,
})
export class AppShell {
	@HostBinding('class') class = 'relative antialiased text-primary';
}

import {APP_ROUTES} from './app.routes';

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
	declarations: [AppShell],
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
	bootstrap: [AppShell],
})
export class AppModule {}
