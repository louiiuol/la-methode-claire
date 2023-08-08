import {
	Component,
	HostBinding,
	ViewChild,
	forwardRef,
	inject,
} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

const MaterialModules = [MatSidenavModule, MatListModule];

import {HeaderComponent} from './components';
import {ButtonComponent, IconComponent} from '@shared/components';
import {NgFor} from '@angular/common';
import {TranslateModule} from '@core';
import {navigationLinks} from './public.routes';

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
		forwardRef(() => TranslateModule),
		forwardRef(() => RouterModule),
		...MaterialModules,
		HeaderComponent,
		ButtonComponent,
		IconComponent,
	],
	template: `
		<mat-drawer-container class="h-full" autosize>
			<mat-drawer
				class="flex flex-col items-start justify-start w-60 p-4"
				#drawer
				mode="over">
				<app-icon class="w-48" svg="logo" />
				<h2 class="text-4xl text-primary px-3 mb-4">
					La Méthode <span class="text-orange">Claire</span>
				</h2>
				<hr class="mb-5" />
				<mat-list role="list">
					<mat-list-item
						class="!cursor-pointer"
						*ngFor="let link of navigationLinks"
						color="primary"
						(click)="redirect(link)">
						{{ 'views.public.routes.' + link | translate }}
					</mat-list-item>
				</mat-list>

				<span class="flex-1"></span>
				<p class="text-center p-4">© La méthode claire. {{ currentYear }}</p>
			</mat-drawer>
			<app-public-header (toggledMobileMenu)="drawer.toggle()" />
			<main>
				<router-outlet></router-outlet>
			</main>
			<p class="fixed bottom-0 w-full text-center p-4 -z-10">
				© La méthode claire. {{ currentYear }}
			</p>
		</mat-drawer-container>
	`,
})
export class PublicPage {
	@HostBinding('class') private readonly class = 'page';
	protected readonly currentYear = new Date().getFullYear();

	@ViewChild('drawer') drawer?: MatDrawer;

	protected redirect(url: string) {
		this.drawer?.close();
		this.router.navigateByUrl(`/${url}`);
	}

	protected readonly navigationLinks = navigationLinks;

	constructor(private readonly router: Router) {}
}
