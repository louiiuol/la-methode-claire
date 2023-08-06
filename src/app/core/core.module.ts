import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {CanDeactivateGuard} from '@core/helpers/guards';

/**
 * Injectables to be provided globally
 * @internal
 */
const providers = [CanDeactivateGuard];

/**
 * This module, injected globally, brings together multiple modules & services needed to build this app.
 * This allows developers to use injected tools easily.
 *
 * Services
 *
 * Helpers are isolated functions or services that can be used in any service or component of this application.
 * They are made to reduce the redundancy in code, like formatting, removing nullish properties, etc ..
 *
 * * {@link NotificationService} Notify users with translated messages
 * * {@link TranslateService} Translate messages with optional params
 * * {@link HttpResource} Create HTTP requests tailored to your needs
 * * {@link AuthService} Handle Authentication of current user
 * * {@link PlatformService} Observe device information & changes
 * * {@link ThemeService} Define application's theme
 *
 * Functions
 *
 * * {@link capitalize} Capitalize given string.
 * * {@link clean} Removes nullish properties to given object
 * * {@link UntilDestroyed} Unsubscribe to multiple observables when a component is destroyed
 *
 * Guards
 *
 * * {@link CanDeactivateGuard} Preventing user from leaving page defined by component's logic.
 *
 * Modules
 *
 * @author louiiuol
 */
@NgModule({providers})
export class CoreModule {
	static forRoot(): ModuleWithProviders<NgModule> {
		return {ngModule: CoreModule, providers};
	}

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) throw new Error('❌ CoreModule is already loaded !');
	}
}
