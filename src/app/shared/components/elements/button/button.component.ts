import {
	NgIf,
	NgSwitch,
	NgSwitchCase,
	NgSwitchDefault,
	NgTemplateOutlet,
} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	HostListener,
	Input,
} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
const MaterialModules = [MatButtonModule, MatIconModule, MatMenuModule];
import {ThemePalette} from '@angular/material/core';

type ButtonType =
	| 'basic'
	| 'raised'
	| 'stroked'
	| 'flat'
	| 'icon'
	| 'menu-item';

/**
 * Inherit material button with pre-configuration to ease button/link integration.
 * This component will render a `<button>` or a `<a>` tag depending if `href` is defined or not.
 * (based on HTML schematic, if button redirect to an another page, then it should be an anchor)
 *
 * @see {@link https://material.angular.io/components/button/overview | Material buttons}
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [
		NgIf,
		NgSwitch,
		NgSwitchCase,
		NgSwitchDefault,
		NgTemplateOutlet,
		...MaterialModules,
		RouterLink,
		RouterLinkActive,
	],
	selector: 'app-button',
	templateUrl: 'button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	@HostBinding('class') class = '!font-semibold';

	/**
	 * All types (appearances) available for this component. This props only change the theme of the button
	 * @see {@link https://material.angular.io/components/button/examples#button-types | Material buttons types}
	 */
	@Input() type: ButtonType = 'basic';

	/**
	 * Color of the button. (Default is primary)
	 */
	@Input() color?: ThemePalette;

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
	 * Optional label
	 */
	@Input() label?: string;

	/**
	 * Optional fragment associated with `href` property.
	 */
	@Input() fragment?: string;

	/**
	 * Disable interaction with this button, if the button is disabled, associated
	 * click event will be prevented.
	 */
	@Input() disabled = false;

	@HostListener('click', ['$event'])
	@HostListener('dblclick', ['$event'])
	protected onClick(e: Event) {
		if (this.disabled) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
}
