import {Component, HostListener} from '@angular/core';
import {ThemeService, TranslateService} from '@core';

/**
 * Root component of the Application, responsible for:
 * - Displaying "root" notifications to the user.
 * - Defining layout of application, in which views will be displayed.
 */
@Component({
	selector: 'app-root',
	template: `
		<p-toast key="root" position="top-right"></p-toast>
		<router-outlet></router-outlet>
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

	constructor(translator: TranslateService, theme: ThemeService) {
		translator.init();
		theme.init();
	}
}
