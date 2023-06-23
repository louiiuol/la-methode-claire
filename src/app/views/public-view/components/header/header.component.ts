import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import {PlatformService, TranslateModule} from '@core';
import {
	ButtonComponent,
	IconComponent,
	ThemeSwitcherComponent,
} from '@shared/components';
import {PUBLIC_ROUTES} from '../../public.routes';

/**
 * Public views global header
 *
 * Contains navigation links and preference buttons (heme & lang)
 */
@Component({
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatToolbarModule,
		IconComponent,
		ButtonComponent,
		ThemeSwitcherComponent,
	],
	selector: 'app-public-header',
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	/**
	 * Emits when "hamburger" button is clicked.
	 * This event will be used by {@link PublicPage} to toggle Sidebar display mode.
	 */
	@Output() toggledMobileMenu = new EventEmitter();

	readonly navigationLinks = ['method', 'formula', 'claire', 'support'];

	constructor(public platform: PlatformService) {}
}
