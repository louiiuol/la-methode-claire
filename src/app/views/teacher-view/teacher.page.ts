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
		<mat-drawer-container class="h-full bg-yellow-light" autosize>
			<mat-drawer
				class="flex flex-col items-start justify-start w-60 p-4"
				#drawer
				mode="over">
				<app-icon class="w-32 my-6" svg="logo" />
				<h2 class="text-4xl text-primary px-3 mb-4">
					La méthode <span class="text-orange">claire</span>
				</h2>
				<hr class="mb-5" />
				<mat-list role="list">
					<mat-list-item
						class="!cursor-pointer"
						*ngFor="let link of navigationLinks"
						color="primary"
						(click)="redirect(link)">
						{{ 'views.teacher.routes.' + link | translate }}
					</mat-list-item>
				</mat-list>

				<span class="flex-1"></span>
				<p class="text-center p-4 text-primary">
					Copyright © {{ currentYear }} <br />
					<b>La méthode claire</b>.
				</p>
			</mat-drawer>
			<app-logged-header (toggledMobileMenu)="drawer.toggle()" />
			<main>
				<router-outlet />
			</main>
		</mat-drawer-container>
	`,
})
export class TeacherPage {
	@HostBinding('class')
	protected readonly class = 'page';
	@HostBinding('id')
	protected readonly key = 'teacher-view';

	@ViewChild('drawer') drawer?: MatDrawer;

	protected readonly currentYear = new Date().getFullYear();
	protected readonly navigationLinks = navigationLinks;

	constructor(private readonly router: Router) {}

	protected redirect(url: string) {
		this.drawer?.close();
		this.router.navigateByUrl(`/app/${url}`);
	}
}
