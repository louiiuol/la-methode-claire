import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

import {TranslateModule} from '@ngx-translate/core';

import {TranslateService} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components/elements';

/**
 * Standalone component displaying a button with current language as content:
 * * This button triggers a menu that list all languages available.
 * * User can click on one language to toggle application language.
 *
 * @see {@link TranslateService} to learn more about translation system
 */
@Component({
	standalone: true,
	imports: [
		NgFor,
		TranslateModule,
		ButtonComponent,
		IconComponent,
		MatMenuModule,
	],
	selector: 'app-lang-switcher',
	templateUrl: './lang-switcher.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent {
	constructor(public readonly translator: TranslateService) {}
}
