import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {HeaderComponent} from '@shared/components';

/**
 * Public View Container, defines global layout.
 * - Sidebar to present Application & display navigation on mobile (not ready yet)
 * - Header with navigation links and Logo (responsive integrated)
 * - <router-outlet> to display children in maximized box (overflow handled)
 *
 * **This container must only contain public actions; At this point, user isn't authenticated yet !**
 */
@Component({
	standalone: true,
	selector: 'app-public-view',
	imports: [RouterOutlet, HeaderComponent],
	template: `
		<app-header />
		<main class="mt-16">
			<router-outlet />
		</main>
		<p
			class="fixed bottom-0 w-full text-center p-4 -z-10 h-16 leading-8 text-sm">
			© {{ currentYear }} <b>La méthode claire</b>.
		</p>
	`,
})
export class PublicView {
	@HostBinding('class') class = 'app-view';

	protected readonly currentYear = new Date().getFullYear();
}
