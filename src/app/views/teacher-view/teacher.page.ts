import {Component, HostBinding, forwardRef} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components';

/**
 * Teacher View Container, defines global layout.
 * - Sidebar to present Application & display navigation on mobile (not ready yet)
 * - Header with navigation links and Logo (responsive integrated)
 * - <router-outlet> to display children in maximized box (overflow handled)
 *
 * **This container must only contain teacher's actions; At this point, user isn't authenticated yet !**
 */
@Component({
	standalone: true,
	template: `
		<app-logged-header />
		<main>
			<router-outlet></router-outlet>
		</main>
	`,
	imports: [forwardRef(() => RouterModule), HeaderComponent],
})
export class TeacherPage {
	@HostBinding('class')
	protected readonly class = 'page';
	@HostBinding('id')
	protected readonly key = 'teacher-view';
}
