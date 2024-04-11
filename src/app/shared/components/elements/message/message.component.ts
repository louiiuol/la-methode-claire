import {
	Component,
	Input,
	ChangeDetectionStrategy,
	HostBinding,
} from '@angular/core';

import {NotificationSeverity} from '@core/modules/notification';
import {IconComponent} from '../icon/icon.component';

const MESSAGE_DICTIONARY = {
	info: {icon: 'info', color: 'bg-blue-100 border-blue-500 text-blue-900'},
	note: {
		icon: 'lightbulb',
		color: 'bg-indigo-100 border-indigo-500 text-indigo-900',
	},
	warn: {
		icon: 'warning',
		color: 'bg-orange-100 border-orange-500 text-orange-900',
	},
	error: {icon: 'error', color: 'bg-red-100 border-red-500 text-red-900'},
	success: {icon: 'done', color: 'bg-teal-100 border-teal-500 text-teal-900'},
} as const;

/**
 * Simple component to display inline container with colored messages depending on given
 * severity. Check this component's `@Input` for more informations
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [IconComponent],
	selector: 'app-message',
	templateUrl: 'message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
	@HostBinding('class') class = 'block';
	/** Primary message of the notification */
	@Input({required: true}) summary!: string;

	/** Severity of the message, Defines the type of Notification to be displayed */
	@Input({required: true}) severity!: NotificationSeverity;

	/** Secondary message, provide more context (can be omitted) */
	@Input() details?: string;

	@Input() showIcon = true;

	protected readonly getMessageIcon = () =>
		this.severity ? MESSAGE_DICTIONARY[this.severity].icon : 'info';

	protected readonly getMessageColor = () =>
		this.severity ? MESSAGE_DICTIONARY[this.severity].color : '';
}
