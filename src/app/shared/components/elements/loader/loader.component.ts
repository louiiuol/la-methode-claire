import {ChangeDetectionStrategy, Component} from '@angular/core';

/**
 * Simple component to render a loader (with CSS only).
 * This component is meant to be called with *ngIf directive: otherwise will always be shown.
 * Also, this component is positioned as absolute, so parent element must be positioned as relative.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	selector: 'app-loader',
	template: `<span class="text-primary"></span>`,
	styleUrls: ['./loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
