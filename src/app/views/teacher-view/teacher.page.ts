import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@shared/components';

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
	imports: [RouterOutlet, HeaderComponent],
	template: `
		<app-header />
		<main class="pt-16">
			<router-outlet />
		</main>
	`,
})
export class TeacherPage {
	@HostBinding('class')
	protected readonly class = 'block h-full bg-yellow-light';
	@HostBinding('id')
	protected readonly key = 'teacher-view';
}
