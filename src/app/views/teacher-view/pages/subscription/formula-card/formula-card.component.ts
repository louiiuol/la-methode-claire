import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-formula-card',
	template: `<header class="mb-6 text-center">
			<h2 class="text-primary">La formule</h2>
			<h3 class="text-xs italic">
				Abonnez-vous pour profiter pleinement de la méthode !
			</h3>
			<p class="font-bold text-2xl text-primary">49.99€ HT / an</p>
		</header>
		<p class="italic">Cette formule vous donne accès à:</p>
		<ul class="description ml-4 list-decimal">
			<li>
				Une année de contenu; Leçons, script, exercices et affiches pour vous
				accompagner
			</li>
			<li>Un accès exclusif à la newsletter hebdomadaire de Claire</li>
			<li>
				Des vidéos explicatifs de notions clés tout au long de votre progression
			</li>
		</ul>
		<p class="italic">Et bien plus ..</p> `,
})
export class FormulaCardComponent {
	@HostBinding('class')
	protected readonly class =
		'block mat-elevation-z8 bg-slate-200 rounded-md p-4 pb-5 w-80';
}
