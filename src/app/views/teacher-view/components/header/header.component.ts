import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

const MaterialModules = [MatToolbarModule, MatMenuModule];

import {AuthService, PlatformService} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components';

/**
 * Logged views global header
 *
 * Contains navigation links and preference buttons (heme & lang)
 */
@Component({
	standalone: true,
	imports: [NgIf, NgFor, ...MaterialModules, IconComponent, ButtonComponent],
	selector: 'app-logged-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	/**
	 * Emits when "hamburger" button is clicked.
	 * This event will be used by {@link TeacherPage} to toggle Sidebar display mode.
	 */
	@Output() toggledMobileMenu = new EventEmitter();

	@HostBinding('class') class = 'sticky top-0 z-50';

	protected readonly navigationLinks = [
		'dashboard',
		'progression',
		// 'faq',
		// 'subscription',
	];
	protected readonly currentUser = this.authenticator.currentUser();

	constructor(
		public platform: PlatformService,
		private authenticator: AuthService
	) {}

	protected logOut = () => this.authenticator.logOut();
}
