import {Injectable} from '@angular/core';
import {
	Breakpoints,
	BreakpointObserver,
	BreakpointState,
} from '@angular/cdk/layout';
import {Platform} from '@angular/cdk/platform';

import {takeUntilDestroyed} from '@core';

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
	/**
	 * name of the current size based on device screen width (default is unset)
	 */
	currentSize: PlatformBreakpointName = 'unset';

	/**
	 * Checks if platform is a mobile (android or ios)
	 */
	isMobilePlatform = this.platform.ANDROID || this.platform.IOS;

	private readonly breakPointSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

	private platformMap = new Map([
		[Breakpoints.XSmall, 'xs'],
		[Breakpoints.Small, 'sm'],
		[Breakpoints.Medium, 'md'],
		[Breakpoints.Large, 'lg'],
		[Breakpoints.XLarge, 'xl'],
	]);

	constructor(
		breakpointObserver: BreakpointObserver,
		private platform: Platform
	) {
		this.watchPlatformBreakpoints(breakpointObserver);
	}

	/**
	 * Checks viewport and returns desired size.
	 * For example, if device is a mobile, this method will return {mobileSize}
	 * Note: If called directly in component template: `[class]="responsive(...)"`,
	 * value will update automatically !
	 * @param mobileSize size of element on mobile view
	 * @param mediumSize size of element on tablet view
	 * @param largeSize size of element on desktop view
	 * @returns Tailwind class to apply according to current viewport size
	 */
	responsive = (mobileSize: string, mediumSize: string, largeSize: string) =>
		this.isMobileView() ? mobileSize : this.getLargeSize(mediumSize, largeSize);

	/**
	 *  Checks if currentSize if smaller or equal to 'md' size (768px)
	 * @returns True if viewport is smaller or equal to 'md' size, false otherwise
	 */
	isMobileView = () => this.isSmallerOrEqual('md');

	/**
	 * Checks if current browser size (width) is bigger than the size given.
	 * @param size name of the minimal size required
	 * @returns True is current size is bigger than given one
	 */
	isBiggerThan = (size: PlatformBreakpointName) =>
		this.breakPointSizes.indexOf(size) <
		this.breakPointSizes.indexOf(this.currentSize);

	/**
	 * Checks if current browser size (width) is bigger or equal to the size given.
	 * @param size name of the minimal size required
	 * @returns True is current size is bigger or equal to the given one
	 */
	isBiggerOrEqual = (size: PlatformBreakpointName) =>
		this.breakPointSizes.indexOf(size) <=
		this.breakPointSizes.indexOf(this.currentSize);

	/**
	 * Checks if current browser size (width) is smaller than the size given.
	 * @param size name of the minimal size required
	 * @returns True is current size is smaller than given one
	 */
	isSmallerThan = (size: PlatformBreakpointName) =>
		this.breakPointSizes.indexOf(size) >
		this.breakPointSizes.indexOf(this.currentSize);

	/**
	 * Checks if current browser size (width) is smaller or equal to the size given.
	 * @param size name of the minimal size required
	 * @returns True is current size is smaller or equal to the given one
	 */
	isSmallerOrEqual = (size: PlatformBreakpointName) =>
		this.breakPointSizes.indexOf(size) >
		this.breakPointSizes.indexOf(this.currentSize);

	private watchPlatformBreakpoints(breakpointObserver: BreakpointObserver) {
		breakpointObserver
			.observe([
				Breakpoints.XSmall,
				Breakpoints.Small,
				Breakpoints.Medium,
				Breakpoints.Large,
				Breakpoints.XLarge,
			])
			.pipe(takeUntilDestroyed())
			.subscribe(result => this.updateCurrentSize(result));
	}

	private updateCurrentSize(result: BreakpointState) {
		for (const query of Object.keys(result.breakpoints))
			if (result.breakpoints[query])
				this.currentSize = (this.platformMap.get(query) ??
					'unset') as PlatformBreakpointName;
	}

	private getLargeSize = (mediumSize: string, largeSize: string) =>
		this.isSmallerThan('xl') ? mediumSize : largeSize;
}
