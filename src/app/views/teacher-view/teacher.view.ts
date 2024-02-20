import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@shared/components';

/**
 * Teacher View Container, defines global layout.
 * - Header with navigation links and Logo
 * - <router-outlet> to display children in maximized box (overflow not handled)
 *
 * **This container must only contain teacher's actions; At this point, user must be authenticated !**
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	selector: 'app-teacher-view',
	imports: [RouterOutlet, HeaderComponent],
	template: `
		<app-header type="logged" />
		<main class="pt-16 h-full">
			<router-outlet />
		</main>
	`,
})
export class TeacherView {
	@HostBinding('class') class = 'app-view bg-yellow-light';
}
