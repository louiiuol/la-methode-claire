import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
const MaterialModules = [MatToolbarModule, MatMenuModule];

import {AuthService, PlatformService} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components';
import {navigationLinks} from 'src/app/app.routes';

/**
 * Logged views global header
 *
 * Contains navigation links and preference buttons (heme & lang)
 */
@Component({
	standalone: true,
	imports: [NgIf, NgFor, ...MaterialModules, IconComponent, ButtonComponent],
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	/**
	 * Emits when "hamburger" button is clicked.
	 * This event will be used by {@link TeacherPage} to toggle Sidebar display mode.
	 */
	@Output() toggledMobileMenu = new EventEmitter();

	protected currentUser = this.authenticator.currentUser();

	@HostBinding('class')
	protected class = 'w-full fixed top-0 mat-elevation-z2 z-50';

	protected readonly navigationLinks = navigationLinks;

	constructor(
		public platform: PlatformService,
		private authenticator: AuthService
	) {}

	protected isMobile = () => this.platform.isMobileView();
	protected logOut = () => this.authenticator.logOut();
}