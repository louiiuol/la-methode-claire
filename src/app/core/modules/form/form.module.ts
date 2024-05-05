import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FORMLY_CONFIG, FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {formlyValidationConfig} from './config/formly-validation-config.fn';

import {MaterialFileInputModule} from 'ngx-material-file-input';

/**
 * Provides modules and config used to simplify form creation and management.
 *
 * All form of this application are made with `ReactiveFormsModule` (check out angular documentation for more information about this module)
 * combined with `FormlyModule`. This makes it easy to create translated forms with error management and translation integrated !
 *
 * For usage, please check `FormComponent` documentation.
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	imports: [
		ReactiveFormsModule,
		MaterialFileInputModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		FormlyModule,
		FormlyMaterialModule,
		MaterialFileInputModule,
	],
	providers: [
		{
			provide: FORMLY_CONFIG,
			multi: true,
			useFactory: formlyValidationConfig,
		},
	],
})
export class FormModule {}
