import {NgFor} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';

import {NotificationService} from '@core/modules/notification';
import {MessageComponent} from '@shared/components';

/**
 * Simple container for global notification
 * Will display all notification emitted from `NotificationService`.notifications signal
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [MessageComponent, NgFor],
	selector: 'app-toaster',
	template: `
		<app-message
			*ngFor="let n of notifications()"
			[closable]="n.closable"
			[summary]="n.summary"
			[details]="n.details"
			[severity]="n.severity" />
	`,
})
export class ToasterComponent {
	@HostBinding('class')
	protected readonly class = 'absolute right-2 top-20 w-sm z-50 px-3';

	protected readonly notifications = inject(NotificationService).notifications;
}