import {NgIf, NgTemplateOutlet} from '@angular/common';
import {
	Component,
	ContentChild,
	HostBinding,
	Input,
	TemplateRef,
} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * Inherit material card with pre-configuration to ease its integration.
 * * Optionals title and subtitle will be automatically translated (TranslateKey must exists)
 * * Optional `cardFooter` template is available
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-card',
	standalone: true,
	imports: [NgIf, NgTemplateOutlet, MatCardModule],
	templateUrl: './card.component.html',
})
export class CardComponent {
	@HostBinding('class') class = 'block mx-auto px-4';

	/**
	 * Title to be displayed in the card
	 */
	@Input() title?: string;

	/**
	 * Description of the card
	 */
	@Input() subtitle?: string;

	@ContentChild('cardFooter') protected cardFooter?: TemplateRef<any>;
}
