import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { takeUntilDestroyed } from '@core';
import { map } from 'rxjs';

type PlatformBreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'unset';

/**
 * Provides methods and property to keep track of current device information.
 *
 * When application init, this service process the following:
 * * Watch for the current size {@link PlatformBreakpointName}
 * and update {@currentSize} value whenever viewport size changes.
 *
 * @author louiiuol
 */
@Injectable()
export class PlatformService {
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly platform = inject(Platform);

	readonly isMobilePlatform = this.platform.ANDROID || this.platform.IOS;

	private readonly breakPointSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

	private readonly platformMap = new Map<string, PlatformBreakpointName>([
		[Breakpoints.XSmall, 'xs'],
		[Breakpoints.Small, 'sm'],
		[Breakpoints.Medium, 'md'],
		[Breakpoints.Large, 'lg'],
		[Breakpoints.XLarge, 'xl'],
	]);

	readonly currentSize = toSignal(
		this.breakpointObserver
			.observe([
				Breakpoints.XSmall,
				Breakpoints.Small,
				Breakpoints.Medium,
				Breakpoints.Large,
				Breakpoints.XLarge,
			])
			.pipe(
				map(res => {
					return (
						Object.keys(res.breakpoints)
							.filter(query => res.breakpoints[query])
							.map(query => this.platformMap.get(query))
							?.at(0) ?? 'unset'
					);
				}),
				takeUntilDestroyed()
			),
		{ initialValue: 'unset' }
	);

	readonly isMobileView = computed(
		() =>
			this.breakPointSizes.indexOf('xs') >=
			this.breakPointSizes.indexOf(this.currentSize())
	);

	readonly isTabletOrBigger = computed(
		() =>
			this.breakPointSizes.indexOf('md') <=
			this.breakPointSizes.indexOf(this.currentSize())
	);
}
