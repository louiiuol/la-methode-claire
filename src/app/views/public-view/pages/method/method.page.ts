import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	templateUrl: 'method.page.html',
})
export class MethodPage {
	@HostBinding('class')
	protected readonly class = 'bg-yellow-light text-primary px-10 text-2xl';
}
