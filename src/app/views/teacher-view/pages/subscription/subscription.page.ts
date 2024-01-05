import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';
import {FormulaCardComponent} from './formula-card/formula-card.component';

@Component({
	standalone: true,
	selector: 'app-subscription',
	imports: [CardComponent, FormulaCardComponent],
	template: `<app-formula-card />

		<div
			class="p-3 max-w-sm bg-slate-400 rounded-md flex flex-col justify-between text-white gap-6">
			<h2 class="text-3xl text-center">Comment s'abonner ?</h2>
			<p class="italic text-balance text-center">
				Il vous suffit d'envoyer un chèque à l'ordre d'
				<strong>Anne Moreau </strong>
				(responsable de l'illustration et de l'édition de La Méthode claire) à
				l'adresse ci-dessous :
			</p>
			<div
				id="address"
				class="flex flex-col bg-slate-100 text-primary w-fit mx-auto p-3 rounded-sm">
				<span>La Méthode claire</span>
				<span>1, hameau de La Chalmelle</span>
				<span>51120 La Forestière</span>
			</div>

			<p class="text-sm italic text-center">
				Votre abonnement sera activé à réception du règlement.
			</p>
		</div>`,
})
export class SubscriptionPage {
	@HostBinding('class')
	protected readonly class =
		'page flex flex-wrap items-center justify-center gap-12 px-4';
}
