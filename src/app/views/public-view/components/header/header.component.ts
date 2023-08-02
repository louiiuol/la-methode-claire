import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	Output,
} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import {PlatformService} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components';

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

	@HostBinding('class') class = 'sticky top-0 z-50';

	readonly navigationLinks = ['method', 'explanation', 'who_is_claire', 'faq'];

	constructor(public platform: PlatformService) {}
}
