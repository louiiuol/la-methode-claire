import {HttpClient} from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	resource,
} from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {firstValueFrom, map} from 'rxjs';

/**
 * Embedded SVG icon fetched locally from custom assets.
 * Check property "name" for technical information.
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-icon',
	host: {class: 'inline-flex items-center mx-auto'},
	template: `@if (svg() && fetched.value()) {
		<mat-icon
			class="!w-full"
			[color]="color()"
			inline
			[svgIcon]="svg()"
			aria-hidden="false" />
	} `,
	imports: [MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	readonly svg = input.required<string>();
	readonly color = input<string>();

	private readonly _ASSETS_ROOT = 'assets/img/icon';

	private readonly httpClient = inject(HttpClient);
	private readonly iconRegistry = inject(MatIconRegistry);
	private readonly sanitizer = inject(DomSanitizer);

	protected readonly fetched = resource({
		params: () => this.svg(),
		loader: async ({params: svg}) => {
			return firstValueFrom(
				this.httpClient
					.get(`${this._ASSETS_ROOT}/${svg}.svg`, {
						responseType: 'text',
					})
					.pipe(
						map(icon => {
							if (svg)
								this.iconRegistry.addSvgIconLiteral(
									svg,
									this.sanitizer.bypassSecurityTrustHtml(icon as string)
								);
							return !!svg;
						})
					)
			);
		},
	});
}
