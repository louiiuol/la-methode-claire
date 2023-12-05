import {Component, HostBinding, ViewChild, forwardRef} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {HeaderComponent} from './components';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
const MaterialModules = [MatSidenavModule, MatListModule];
import {IconComponent} from '@shared/components';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@core';
import {NgFor} from '@angular/common';
import {navigationLinks} from './teacher.routes';

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
	imports: [
		NgFor,
		forwardRef(() => RouterModule),
		TranslatePipe,
		HeaderComponent,
		...MaterialModules,
		IconComponent,
	],
	template: `
		<app-logged-header />
		<main>
			<router-outlet />
		</main>
	`,
})
export class TeacherPage {
	@HostBinding('class')
	protected readonly class = 'block h-full bg-yellow-light';
	@HostBinding('id')
	protected readonly key = 'teacher-view';

	protected readonly currentYear = new Date().getFullYear();
	protected readonly navigationLinks = navigationLinks;

	constructor(private readonly router: Router) {}
}
