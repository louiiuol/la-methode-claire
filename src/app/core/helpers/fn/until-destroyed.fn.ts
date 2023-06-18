import {DestroyRef, inject} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

/**
 * If you are subscribing to an observable inside a component, you gonna want to unsubscribe
 * to it when to component destroys (for performance issues). This function provides a pattern
 * to ease that subscription management
 *
 * To use this function, you simply have to add a property `untilDestroyed = untilDestroyed()`
 * and call it inside a pipe() operator (..pipe(this.untilDestroyed())) to unsubscribed automatically when component is destroyed
 *
 * This method being generic, you can infer the observable's type to internal subject. this way, you won't
 * loose your type after calling this operator.
 *
 * @returns Function to invoke inside a rxjs pipe() operator
 */
export function untilDestroyed() {
	const subject$ = new Subject<any>();
	inject(DestroyRef).onDestroy(() => {
		subject$.next(true);
		subject$.complete();
	});
	return <T = any>() => takeUntil<T>(subject$.asObservable());
}
