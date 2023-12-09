import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@shared/components';

/**
 * Admin View Container, defines global layout.
 * - Header with navigation links and Logo
 * - <router-outlet> to display children in maximized box (overflow not handled)
 *
 * **This container must only contain admin's actions; At this point, user must be authenticated as Admin !**
 */
@Component({
	standalone: true,
	selector: 'app-admin-view',

	imports: [RouterOutlet, HeaderComponent],
	template: `
		<app-header />
		<main class="pt-16">
			<router-outlet />
		</main>
	`,
})
export class AdminView {
	@HostBinding('class') class = 'app-view bg-accent text-white';
}
