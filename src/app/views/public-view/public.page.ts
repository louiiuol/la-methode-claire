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
		<main>
			<router-outlet></router-outlet>
		</main>
	`,
})
export class PublicPage {
	@HostBinding('class') private readonly class = 'page';
}
