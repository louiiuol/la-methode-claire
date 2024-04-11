import {NgIf} from '@angular/common';
import {Component, HostBinding, Input} from '@angular/core';
import {ButtonComponent, CardComponent} from '@shared/components';

@Component({
	standalone: true,
	selector: 'app-formula-card',
	imports: [NgIf, CardComponent, ButtonComponent],
	template: `
		<app-card
			title="L'abonnement"
			subtitle="Abonnez-vous pour profiter pleinement de la méthode !">
			<p class="font-bold text-2xl text-primary !pt-0">
				<span class="text-3xl">120€</span> TTC / an
			</p>
			<hr />
			<p class="italic mb-3">Cet abonnement vous donne accès à:</p>
			<ul class="description ml-4 list-disc mb-4">
				<li class="my-4">
					une année scolaire de fichiers pdf à télécharger, imprimer et/ou
					projeter : leçons, scripts, exercices et affiches.
				</li>
				<li class="my-4">un accès exclusif à la newsletter de Claire.</li>
				<li class="my-4">des vidéos explicatives.</li>
				<li class="my-4">
					la possibilité d'échanger avec Claire. Elle répond à vos questions et
					cela enrichit la méthode.
				</li>
			</ul>
			<ng-container *ngIf="!logged">
				<p>
					Pour vous abonner vous devrez d'abord vous
					<a class="text-primary underline" href="/register">inscrire</a>.
				</p>
				<br />
			</ng-container>

			<p>
				Une question ?
				<a
					class="text-primary font-bold"
					href="mailto:methode.claire@gmail.com">
					methode.claire&#64;gmail.com
				</a>
			</p>
		</app-card>
	`,
})
export class FormulaCardComponent {
	@HostBinding('class') class = 'max-w-lg';

	@Input() logged = false;
}
