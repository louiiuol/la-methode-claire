import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * @internal
 */
type CanComponentDeactivate = {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
};

/**
 * Checks if component allows to redirect to another route.
 * * Must be called in angular route with `canDeactivate` property.
 * * Must be associated with component that contains a `canDeactivate() method`
 *
 * This way, component can defines some logic to prevent user from leaving section,
 * without saving a form changes for example..
 * @internal
 * @deprecated
 */
@Injectable()
export class CanDeactivateGuard {
	canDeactivate(
		component: CanComponentDeactivate
	): Observable<boolean> | Promise<boolean> | boolean {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}
