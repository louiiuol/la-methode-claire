import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	templateUrl: 'about.page.html',
})
export class AboutPage {
	@HostBinding('class')
	protected readonly class = 'block';
}
