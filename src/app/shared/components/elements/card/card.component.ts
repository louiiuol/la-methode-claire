import {NgIf, NgTemplateOutlet} from '@angular/common';
import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslateModule} from '@core';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [NgIf, NgTemplateOutlet, MatCardModule, TranslateModule],
	templateUrl: './card.component.html',
})
export class CardComponent {
	/**
	 * Title to be displayed in the card
	 */
	@Input() title?: string;

	/**
	 * Description of the card
	 */
	@Input() subtitle?: string;

	@ContentChild('cardFooter')
	protected cardFooter?: TemplateRef<any>;
}
