import {AsyncPipe, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
	Component,
	OnChanges,
	Input,
	ChangeDetectionStrategy,
	HostBinding,
} from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {takeUntilDestroyed} from '@core';
import {Observable, map} from 'rxjs';

/**
 * Embedded SVG icon fetched locally from custom assets.
 * Check property "name" for technical information.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [NgIf, AsyncPipe, MatIconModule],
	selector: 'app-icon',
	template: ` <mat-icon
			class="!w-full"
			inline
			*ngIf="svg && fetched$ && (fetched$ | async)"
			[svgIcon]="svg"
			aria-hidden="false" />
		<mat-icon *ngIf="!svg" class="!w-full" aria-hidden="false">
			<ng-content></ng-content>
		</mat-icon>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
	/**
	 * Defines icon to be shown. (can be updated)
	 * * Check assets/images/svg folder for available icons
	 */
	@Input() svg?: string;

	@HostBinding('class')
	protected readonly class = 'inline-flex items-center mx-auto';

	protected fetched$?: Observable<boolean>;

	private readonly _ASSETS_ROOT = 'assets/img/icon';
	private readonly untilDestroyed$ = takeUntilDestroyed();

	constructor(
		private _httpClient: HttpClient,
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer
	) {}

	ngOnChanges(): void {
		if (this.svg)
			this.fetched$ = this._httpClient
				.get(`${this._ASSETS_ROOT}/${this.svg}.svg`, {
					responseType: 'text',
				})
				.pipe(
					this.untilDestroyed$,
					map(icon => {
						if (this.svg)
							this.iconRegistry.addSvgIconLiteral(
								this.svg,
								this.sanitizer.bypassSecurityTrustHtml(icon as string)
							);
						return !!this.svg;
					})
				);
	}
}
