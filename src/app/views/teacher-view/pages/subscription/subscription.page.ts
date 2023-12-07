import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';
import {FormulaCardComponent} from './formula-card/formula-card.component';

@Component({
	standalone: true,
	selector: 'app-subscription',
	imports: [CardComponent, FormulaCardComponent],
	template: `<app-formula-card />
		<section>
			<h2 class="text-primary">S'abonner</h2>
			<div class="w-80 h-96 bg-slate-400 mx-auto rounded-md">
				<p class="text-white h-full text-center pt-10 text-lg">
					Intégration du formulaire à venir
				</p>
			</div>
		</section>`,
})
export class SubscriptionPage {
	@HostBinding('class')
	protected readonly class =
		'page flex flex-wrap items-center justify-center gap-12 px-4';
}
