import {Component} from '@angular/core';
import {ButtonComponent, CardComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [CardComponent, ButtonComponent],
	templateUrl: 'home.page.html',
})
export class HomePage {
	protected readonly methodExplanations = [
		{
			index: 1,
			color: '#ac981a',
			name: 'scripts',
			title: 'Scripts',
			description:
				'La pierre angulaire de la méthode Tout y est décortiqué, expliqué. Mais avant tout, ces scripts vous aident à comprendre les mécanismes de l’apprentissage de la lecture.',
		},
		{
			index: 2,
			color: '#fdeaa6',
			name: 'lesson',
			title: 'Leçons',
			description:
				'À imprimer et/ou projeter sur votre TBI, chaque leçon est conçue de la même façon : les enfants doivent d’abord lire des syllabes et/ou logatomes, des groupes nominaux et verbaux, des phrases, et à partir de la leçon 11, des histoires qui suivent la progression.',
		},
		{
			index: 3,
			color: '#b2ced8',
			name: 'exercice',
			title: 'Exercices',
			description:
				'À partir de la leçon 6. Conçus pour faire lire, écrire et réfléchir, les exercices rebrassent les obstacles inhérents à l’apprentissage de la lecture.',
		},
		{
			index: 4,
			color: '#ef7e64',
			name: 'poster',
			title: 'Affiches',
			description:
				'Elles correspondent à chacune des lettres ou digrammes/trigrammes (deux ou trois lettres qui ne font qu’un seul son) que vous pourrez afficher dans votre classe. Ou pas.',
		},
		{
			index: 5,
			color: '#ef7f96',
			name: 'newsletter',
			title: 'Newsletter',
			description:
				'Bi-mensuelle, elle viendra éclairer les questions que certains apprentissages ne manqueront pas de faire surgir. Et donc vous soutenir, vous, enseignant.',
		},
	];
}
