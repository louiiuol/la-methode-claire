import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';
import {FormulaCardComponent} from './formula-card/formula-card.component';

@Component({
	standalone: true,
	selector: 'app-subscription',
	imports: [CardComponent, FormulaCardComponent],
	template: `<app-formula-card />
		<section>
			<h2 class="text-primary text-2xl">Comment s'abonner ?</h2>
			<div class="w-80 h-96 bg-slate-400 mx-auto rounded-md">
				<p class="text-white h-full text-center pt-10 text-lg">
					Pour bénéficier du contenu de la méthode, il vous suffit de nous
					envoyer un chèque à l'adresse ci-dessous:
				</p>

				<h4>1 hameau de la chalmelle 51120 La Forestière</h4>
				<p>à l'ordre de <em>Claire Delavaux</em></p>

				<hr />

				<p>
					Dès réception de votre chèque, vous activerons manuellement votre
					abonnement pour l'année courante.
				</p>
			</div>
		</section>`,
})
export class SubscriptionPage {
	@HostBinding('class')
	protected readonly class =
		'page flex flex-wrap items-center justify-center gap-12 px-4';
}
