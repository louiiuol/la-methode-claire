import {Component, HostBinding, forwardRef} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './components';
import {ButtonComponent, IconComponent} from '@shared/components';
import {NgFor} from '@angular/common';

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
	imports: [
		NgFor,
		forwardRef(() => RouterModule),
		HeaderComponent,
		ButtonComponent,
		IconComponent,
	],
	template: `
		<app-public-header />
		<main class="pb-16 mt-16">
			<router-outlet />
		</main>
		<p
			class="fixed bottom-0 w-full text-center p-4 -z-10 h-16 leading-8 text-primary">
			Copyright © {{ currentYear }} <b>La méthode claire</b>.
		</p>
	`,
})
export class PublicPage {
	@HostBinding('class') protected readonly class = 'text-2xl';

	protected readonly currentYear = new Date().getFullYear();
}
