import {
	Directive,
	Input,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import {fromEvent, Subject, takeUntil} from 'rxjs';
import {tap, throttleTime} from 'rxjs/operators';

export enum BreakPoints {
	mobile = 380,
	tablet = 768,
	desktop = 922,
	large = 1200,
}

// usage
// <div *mediaQuery="mediaQueries.untilMobile">Mobile</div>
export const MatchMediaQueries = {
	tabletOnly: `(min-width: ${BreakPoints.tablet}px) and (max-width: ${
		BreakPoints.desktop - 1
	}px)`,
	desktopOnly: `(min-width: ${BreakPoints.desktop}px) and (max-width: ${
		BreakPoints.large - 1
	}px)`,
	largeOnly: `(min-width: ${BreakPoints.large}px)`,
	fromMobile: `(min-width: ${BreakPoints.mobile}px)`,
	fromTablet: `(min-width: ${BreakPoints.tablet}px)`,
	fromDesktop: `(min-width: ${BreakPoints.desktop}px)`,
	fromLarge: `(min-width: ${BreakPoints.large}px)`,
	untilMobile: `(max-width: ${BreakPoints.mobile - 1}px)`,
	untilTablet: `(max-width: ${BreakPoints.tablet - 1}px)`,
	untilDesktop: `(max-width: ${BreakPoints.desktop - 1}px)`,
	untilLarge: `(max-width: ${BreakPoints.large - 1}px)`,
};

@Directive({
	standalone: true,
	selector: '[mediaQuery]',
})
export class MediaQuery implements OnInit, OnDestroy {
	@Input({required: true}) mediaQuery!: string;

	private mediaQueryList!: MediaQueryList;
	private isCreated = false;

	private readonly destroy$: Subject<void> = new Subject<void>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<unknown>
	) {}

	ngOnInit() {
		if (!this.mediaQuery) {
			return;
		}

		this.mediaQueryList = matchMedia(this.mediaQuery);

		fromEvent<MediaQueryListEvent>(this.mediaQueryList, 'change')
			.pipe(
				takeUntil(this.destroy$),
				throttleTime(400),
				tap<MediaQueryListEvent>(({matches}) => this.update(matches))
			)
			.subscribe();

		this.update(this.mediaQueryList.matches);
	}

	update(matches: boolean) {
		if (this.isCreated) {
			this.viewContainerRef.clear();
		}

		if (!matches) {
			return;
		}

		const ref = this.viewContainerRef.createEmbeddedView(this.templateRef);
		ref.markForCheck();
		this.isCreated = true;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
