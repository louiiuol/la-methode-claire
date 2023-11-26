import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	templateUrl: 'about.page.html',
})
export class AboutPage {
	@HostBinding('class')
	protected readonly class = 'bg-accent text-primary px-9 sm:px-12 block';
}
