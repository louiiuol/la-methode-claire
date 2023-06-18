import {NgModule} from '@angular/core';

import {LayoutModule} from '@angular/cdk/layout';
import {
	PlatformModule as NgPlatformModule,
	Platform,
} from '@angular/cdk/platform';

import {ThemeService} from './services/theme.service';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlatformService} from './services/platform.service';

/**
 * Angular modules used to handle current device.
 * @internal
 */
const modules = [
	BrowserModule,
	BrowserAnimationsModule,
	LayoutModule,
	NgPlatformModule,
];

/**
 * Wrapper modules using `@angular/platform-browser` and `@angular/cdk`
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	imports: [...modules],
	providers: [PlatformService, ThemeService, Platform],
	exports: [...modules],
})
export class PlatformModule {}
