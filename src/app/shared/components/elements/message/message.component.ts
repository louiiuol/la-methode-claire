import {NgIf} from '@angular/common';
import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {NotificationSeverity} from '@core/modules/notification';

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
 * Simple standalone to display inline box with colored messages depending on given
 * severity. Check this component's `@Input` for more informations
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [NgIf, MatIconModule],
	selector: 'app-message',
	template: `
		<div
			*ngIf="summary && severity"
			class="flex items-start justify-start gap-3 mb-3 border-l-4 rounded-r px-4 py-3 shadow-md"
			[class]="getMessageColor()">
			<mat-icon class="my-1">
				{{ getMessageIcon() }}
			</mat-icon>
			<div class="px-1">
				<p class="font-bold">{{ summary }}</p>
				<p class="text-sm" *ngIf="details" [innerHTML]="details"></p>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
	/** Primary message of the notification */
	@Input({required: true}) summary!: string;

	/** Severity of the message, Defines the type of Notification to be displayed */
	@Input({required: true}) severity!: NotificationSeverity;

	/** Secondary message, provide more context (can be omitted) */
	@Input() details?: string;

	/** Allow to dismiss message (set to false by default) */
	@Input() closable?: boolean;

	protected readonly getMessageIcon = () =>
		this.severity ? MESSAGE_DICTIONARY[this.severity].icon : 'info';

	protected readonly getMessageColor = () =>
		this.severity ? MESSAGE_DICTIONARY[this.severity].color : '';
}
