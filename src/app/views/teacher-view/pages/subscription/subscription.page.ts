import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';
import {FormulaCardComponent} from './formula-card/formula-card.component';

@Component({
	standalone: true,
	selector: 'app-subscription',
	imports: [CardComponent, FormulaCardComponent],
	template: `<app-formula-card [logged]="true" />

		<div
			class="py-3 px-5 pb-6 pt-6 max-w-md bg-slate-400 rounded-md flex flex-col justify-between text-white gap-9">
			<h2 class="text-3xl text-center">Comment s'abonner ?</h2>
			<div class="flex gap-3 items-start justify-start">
				<div
					class="block text-xl bg-primary text-white px-4 py-3 rounded-full leading-none">
					1
				</div>
				<div>
					<p>
						Il vous suffit d'envoyer un chèque à l'ordre d'
						<strong>Anne Moreau </strong>
						(responsable de l'illustration et de l'édition de La Méthode claire)
						à l'adresse ci-dessous :
					</p>
					<div
						class="flex flex-col bg-slate-100 text-primary w-fit py-3 px-5 rounded-md mt-3">
						<span class="font-bold">La Méthode claire</span>
						<span>1, hameau de La Chalmelle</span>
						<span>51120 La Forestière</span>
					</div>
				</div>
			</div>

			<div class="flex gap-3 items-start justify-start">
				<div
					class="block text-xl bg-primary text-white px-4 py-3 rounded-full leading-none">
					2
				</div>
				<p>
					Si vous avez besoin d'une facture, le préciser en spécifiant le nom et
					l'adresse auxquels elle doit être rédigée et l'adresse à laquelle elle
					doit être envoyée, soit postale, soit par mail.
				</p>
			</div>

			<div class="flex gap-3 items-start justify-start">
				<div
					class="block text-xl bg-primary text-white px-4 py-3 rounded-full leading-none">
					3
				</div>
				<p>Votre abonnement sera activé à réception du règlement.</p>
			</div>
		</div>`,
})
export class SubscriptionPage {
	@HostBinding('class')
	protected readonly class =
		'page flex flex-wrap items-center justify-center gap-12 px-4';
}
