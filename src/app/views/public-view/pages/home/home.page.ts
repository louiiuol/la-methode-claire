import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CardComponent} from '@shared/components';
import {METHOD_EXPLANATIONS} from './explanations.constant';

@Component({
	standalone: true,
	imports: [CardComponent, MatButtonModule],
	templateUrl: 'home.page.html',
})
export class HomePage {
	protected readonly methodExplanations = METHOD_EXPLANATIONS;
}
