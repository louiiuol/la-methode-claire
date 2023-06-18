import {Component} from '@angular/core';
import {ThemeService} from '@core/modules/platform/services/theme.service';

import {ButtonComponent, IconComponent} from '@shared/components/elements';

/**
 * Standalone component displaying an icon button with opposite theme as content:
 * * For example, if current theme is dark, this will show a sun ..
 * * User can click on it to toggle application theme.
 *
 * @see {@link ThemeService} to learn more about how theme works
 */
@Component({
	standalone: true,
	imports: [ButtonComponent, IconComponent],
	selector: 'app-theme-switcher',
	templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
	constructor(public theme: ThemeService) {}
}
