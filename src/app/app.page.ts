import {Component, HostBinding, HostListener} from '@angular/core';
import {TranslateService} from '@core';

/**
 * Root component of the Application, responsible for:
 * - Displaying "root" notifications to the user.
 * - Defining layout of application, in which views will be displayed.
 */
@Component({
	selector: 'app-root',
	template: `
		<router-outlet></router-outlet>
		<app-toaster></app-toaster>
	`,
})
export class AppPage {
	/**
	 * Checks if current window can be safely closed .. For example, no request must be in progress
	 * @returns True if component allows redirection, false otherwise
	 */
	@HostListener('window:beforeunload', ['$event'])
	beforeunloadHandler(): boolean {
		return true; //this.queue.canDeactivate.value;
	}

	@HostBinding('class') class = 'relative';

	constructor(translator: TranslateService) {
		translator.init();
	}
}
