import {Component, HostBinding, forwardRef} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components';

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
	imports: [forwardRef(() => RouterModule), HeaderComponent],
	template: `
		<app-public-header />
		<main class="mt-16">
			<router-outlet></router-outlet>
		</main>
		<p class="fixed bottom-0 w-full text-center p-4 -z-10">
			© La méthode claire. {{ currentYear }}
		</p>
	`,
})
export class PublicPage {
	@HostBinding('class') private readonly class = 'page';
	protected readonly currentYear = new Date().getFullYear();
}
