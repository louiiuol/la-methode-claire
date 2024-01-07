import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '../elements';

@Component({
	standalone: true,
	selector: 'app-faq-page',
	imports: [CardComponent],
	template: `
		<app-card
			title="Foire Aux Questions"
			subtitle="En attente de vos questions">
			<img
				class="max-w-sm"
				[src]="
					'https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/email_sent.png'
				" />
		</app-card>
	`,
})
export class FaqPage {
	@HostBinding('class') class = 'block page p-6 bg-accent';
}
