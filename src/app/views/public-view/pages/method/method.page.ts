import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	templateUrl: 'method.page.html',
})
export class MethodPage {
	@HostBinding('class') class = 'block pb-16';
}
