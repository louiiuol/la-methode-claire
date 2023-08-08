import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import {PlatformService} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components';
import {navigationLinks} from '../../public.routes';

/**
 * Public views global header
 *
 * Contains navigation links and preference buttons (heme & lang)
 */
@Component({
	standalone: true,
	imports: [NgIf, NgFor, MatToolbarModule, IconComponent, ButtonComponent],
	selector: 'app-public-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	/**
	 * Emits when "hamburger" button is clicked.
	 * This event will be used by {@link PublicPage} to toggle Sidebar display mode.
	 */
	@Output() toggledMobileMenu = new EventEmitter();

	@HostBinding('class')
	protected readonly class = 'fixed top-0 z-50 w-full';

	protected readonly navigationLinks = navigationLinks;

	isMobile = () => this.platform.isMobileView();

	constructor(private readonly platform: PlatformService) {}
}
