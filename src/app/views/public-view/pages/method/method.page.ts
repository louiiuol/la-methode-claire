import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	templateUrl: 'method.page.html',
})
export class MethodPage {
	@HostBinding('class')
	protected readonly class = 'px-10';
}
