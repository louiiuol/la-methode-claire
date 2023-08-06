import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Represents interface that associated components must implement.
 */
type CanComponentDeactivate = {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
};

/**
 * Checks if component allows user to be redirect to an another route.
 * * Must be called in angular routes with `canDeactivate` property.
 * * Must be associated with component that contains a `canDeactivate()` method
 *
 * This way, components can defines some logic to prevent user from leaving route for specific reason.
 *
 * @author louiiuol
 */
@Injectable()
export class CanDeactivateGuard {
	canDeactivate(
		component: CanComponentDeactivate
	): Observable<boolean> | Promise<boolean> | boolean {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}
