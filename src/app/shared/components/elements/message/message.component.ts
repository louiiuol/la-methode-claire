import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';

import {MatIcon} from '@angular/material/icon';
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
 * Simple component to display inline container with colored messages depending on given
 * severity. Check this component's `@Input` for more informations
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-message',
	host: {
		'class':
			'flex justify-between items-center gap-3 shadow-md px-3 py-2 border-l-4 rounded-r',
		'[class]': 'getMessageColor()',
	},
	template: `
		@if (showIcon()) {
			<mat-icon class="!mx-0 my-1 text-xl">
				{{ getMessageIcon() }}
			</mat-icon>
		}
		<div class="flex-1">
			<span
				class="w-full text-balance"
				[class]="{'font-bold': !!details()}"
				[innerHTML]="summary()"></span>
			<br />
			@if (details()) {
				<span class="text-balance text-sm" [innerHTML]="details()"></span>
			}
		</div>
	`,
	imports: [MatIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
	readonly summary = input.required<string>();
	readonly severity = input.required<NotificationSeverity>();
	readonly details = input<string>();
	readonly showIcon = input<boolean>(true);

	protected readonly getMessageIcon = computed(() =>
		this.severity() ? MESSAGE_DICTIONARY[this.severity()].icon : 'info'
	);

	protected readonly getMessageColor = computed(() =>
		this.severity() ? MESSAGE_DICTIONARY[this.severity()].color : ''
	);
}
