import {Component} from '@angular/core';
import {CardComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [CardComponent],
	templateUrl: 'home.page.html',
})
export class HomePage {}
