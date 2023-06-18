import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';

@Component({
	selector: 'app-loader',
	standalone: true,
	imports: [CommonModule],
	template: `<span></span>`,
	styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
	@HostBinding('class') class = 'is-primary';
}
