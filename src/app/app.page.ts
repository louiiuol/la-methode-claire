import {Component, HostBinding} from '@angular/core';

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
export class AppPage {
	@HostBinding('class') protected readonly class = 'relative antialiased';
}
