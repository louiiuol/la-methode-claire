import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-formula-card',
	template: `<header class="mb-4 px-3 text-center">
			<h2 class="text-primary text-3xl">L'abonnement</h2>
			<h3 class="text-sm italic text-balance my-2">
				Abonnez-vous pour profiter pleinement de la méthode !
			</h3>
			<p class="font-bold text-2xl text-primary mt-3">
				<span class="text-3xl">120€</span> TTC / an
			</p>
		</header>
		<p class="italic mb-3">Cet abonnement vous donne accès à:</p>
		<ul class="description ml-4 list-disc mb-4">
			<li class="my-2">
				une année scolaire de fichiers pdf à télécharger, imprimer et/ou
				projeter : leçons, scripts, exercices et affiches.
			</li>
			<li class="my-2">un accès exclusif à la newsletter de Claire.</li>
			<li class="my-2">des vidéos explicatives.</li>
			<li class="my-2">
				la possibilité d'échanger avec Claire. Elle répond à vos questions et
				cela enrichit la méthode.
				<a
					class="text-primary font-bold ml-3"
					href="mailto:methode.claire@gmail.com">
					methode.claire@gmail.com
				</a>
			</li>
		</ul> `,
})
export class FormulaCardComponent {
	@HostBinding('class')
	protected readonly class =
		'block mat-elevation-z8 bg-slate-200 rounded-md p-4 px-12 pb-5 w-fit max-w-lg';
}
