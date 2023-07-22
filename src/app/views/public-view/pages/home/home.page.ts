import {Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [CardComponent],
	templateUrl: 'home.page.html',
})
export class HomePage {
	@HostBinding('class') protected class = '!block';
}
