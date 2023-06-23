import {
	NgIf,
	NgSwitch,
	NgSwitchCase,
	NgSwitchDefault,
	NgTemplateOutlet,
} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ThemePalette} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@core';

type ButtonType = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon';

/**
 * Inherit material button with pre-configuration to ease button/link integration.
 *
 * @see {@link https://material.angular.io/components/button/overview | Material buttons}
 */
@Component({
	standalone: true,
	imports: [
		NgIf,
		NgSwitch,
		NgSwitchCase,
		NgSwitchDefault,
		NgTemplateOutlet,
		MatIconModule,
		MatButtonModule,
		RouterModule,
		TranslateModule,
	],
	selector: 'app-button',
	templateUrl: 'button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	/**
	 * All types (appearances) available for this component. This props only change the theme of the button
	 * @see {@link https://material.angular.io/components/button/examples#button-types | Material buttons types}
	 */
	@Input() type: ButtonType = 'basic';

	/**
	 * Color of the button. (Default is primary)
	 */
	@Input() color: ThemePalette = 'primary';

	/**
	 * Should this button be disabled ?
	 */
	@Input() disabled = false;

	/**
	 * Optional router Link to redirect user. If this props is set, this component
	 * will use a `<a>` tag instead of `<button>` (to enforce HTML semantic)
	 */
	@Input() href?: string;

	/**
	 * Optional query params associated with `href` property.
	 */
	@Input() params?: {[key: string]: string | string[]};

	/**
	 * Optional label (must match a translation key)
	 */
	@Input() label?: string;

	/**
	 * Optional fragment associated with `href` property.
	 */
	@Input()
	fragment?: string | undefined;
}
