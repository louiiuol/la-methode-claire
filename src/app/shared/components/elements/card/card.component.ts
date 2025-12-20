import {NgTemplateOutlet} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	contentChild,
	input,
	TemplateRef,
} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * Inherit material card with pre-configuration to ease its integration.
 * * Optionals title and subtitle will be automatically translated (TranslateKey must exists)
 * * Optional `cardFooter` template is available
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-card',
	host: {class: 'block mx-auto'},
	template: `<mat-card class="mx-auto px-8 pt-3 pb-4 w-fit max-w-full">
		@if (cardTitle() || subtitle()) {
			<mat-card-header class="!pt-4 !pb-2 text-primary">
				@if (cardTitle()) {
					<mat-card-title
						class="!text-2xl text-balance text-center text-primary">
						{{ cardTitle() }}
					</mat-card-title>
				}
				@if (subtitle()) {
					<mat-card-subtitle class="!mt-2 !text-lg text-balance text-center">
						{{ subtitle() }}
					</mat-card-subtitle>
				}
			</mat-card-header>
		}

		<mat-card-content
			class="relative !flex flex-col justify-start items-center !px-4 !pt-3 !h-fit"
			style="min-width: 200px; min-height: 50px">
			<ng-content></ng-content>
		</mat-card-content>

		@if (cardFooter()) {
			<mat-card-actions class="justify-evenly !px-2">
				<ng-container [ngTemplateOutlet]="cardFooter()"></ng-container>
			</mat-card-actions>
		}
	</mat-card> `,
	imports: [NgTemplateOutlet, MatCardModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
	readonly cardTitle = input<string>();
	readonly subtitle = input<string>();
	readonly cardFooter = contentChild<TemplateRef<unknown>>('cardFooter');
}
