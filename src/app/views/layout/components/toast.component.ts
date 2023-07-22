import {NgFor} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';

import {NotificationService} from '@core/modules/notification';
import {MessageComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [MessageComponent, NgFor],
	selector: 'app-toaster',
	template: `
		<app-message
			*ngFor="let n of notifier.notifications()"
			[closable]="true"
			[summary]="n.summary"
			[details]="n.details"
			[severity]="n.severity" />
	`,
	styles: [
		`
			:host input:-webkit-autofill {
				/* Set any specific styles you want for autofilled inputs */
				/* For example, you might want to set a different background color */
				background-color: white;
				/* Reset box-shadow */
				box-shadow: 0 0 0 1000px white inset; /* Use a large value to cover any autofill background */
			}
		`,
	],
})
export class ToasterComponent {
	@HostBinding('class') protected readonly class =
		'absolute right-4 top-14 w-sm z-10 px-3';

	protected readonly notifier = inject(NotificationService);
}
