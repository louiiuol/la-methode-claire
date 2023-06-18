import {Component, HostBinding, forwardRef, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {PlatformService} from '@core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components';

/**
 * Public View Container, defines global layout:
 * - Sidebar to present Application & display navigation on mobile
 * - Header with navigation links and Logo (responsive integrated)
 * - <router-outlet> to display children in maximized box (overflow handled)
 *
 * **This container must only contain public actions; At this point, user is authenticated yet !**
 */
@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatSidenavModule,
		forwardRef(() => RouterModule),
		HeaderComponent,
	],
	template: `
		<mat-drawer-container class="h-full w-full" autosize>
			<mat-drawer
				#publicDrawer
				[class]="platform.responsive('w-80', 'w-1/3', 'w-120')"
				[mode]="platform.isMobileView() ? 'over' : 'side'"
				[opened]="!platform.isMobileView()">
				hello
			</mat-drawer>
			<mat-drawer-content
				style="display: flex !important;"
				class="flex-1 flex-col">
				<app-public-header
					(toggledMobileMenu)="publicDrawer.toggle()"></app-public-header>
				<main class="centered-content background-gradient">
					<router-outlet></router-outlet>
				</main>
			</mat-drawer-content>
		</mat-drawer-container>
	`,
})
export class PublicPage {
	@HostBinding('class') private readonly class = 'page';
	protected readonly platform = inject(PlatformService);
}
