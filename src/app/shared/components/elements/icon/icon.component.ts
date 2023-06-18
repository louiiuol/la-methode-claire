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
import {untilDestroyed} from '@core';
import {Observable, map} from 'rxjs';

/**
 * Embedded SVG icon fetched locally from custom assets.
 * Check property "name" for technical information.
 * @author louiiuol
 */
@Component({
	standalone: true,
	imports: [NgIf, AsyncPipe, MatIconModule],
	selector: 'app-icon',
	template: ` <!-- SVG embed tag -->
		<mat-icon
			class="!w-full"
			inline
			*ngIf="name && (fetched$ | async)"
			[svgIcon]="name"
			aria-hidden="false" />
		<mat-icon *ngIf="!name" class="!w-full" aria-hidden="false">
			<ng-content></ng-content>
		</mat-icon>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
	/**
	 * Defines icon to be shown. (can be updated)
	 * * Check assets/images/svg folder for available icons
	 */
	@Input() name?: string;

	@HostBinding('class') class = 'block mx-auto';

	protected fetched$ = new Observable();

	private readonly _ASSETS_ROOT = 'assets/icon';
	private readonly untilDestroyed = untilDestroyed();

	constructor(
		private _httpClient: HttpClient,
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer
	) {}

	ngOnChanges(): void {
		if (this.name)
			this.fetched$ = this._httpClient
				.get(`${this._ASSETS_ROOT}/${this.name}.svg`, {
					responseType: 'text',
				})
				.pipe(
					this.untilDestroyed<string>(),
					map(icon => {
						if (this.name)
							this.iconRegistry.addSvgIconLiteral(
								this.name,
								this.sanitizer.bypassSecurityTrustHtml(icon)
							);
						return !!this.name;
					})
				);
	}
}
