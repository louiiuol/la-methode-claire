import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardComponent} from '../elements';

@Component({
	selector: 'app-faq-page',
	host: {class: 'block page p-6 bg-accent'},

	template: `
		<app-card
			title="Foire Aux Questions"
			subtitle="En attente de vos questions">
			<img class="max-w-sm" src="assets/img/faq.gif" />
		</app-card>
	`,
	imports: [CardComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPage {}
