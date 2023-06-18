import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PUBLIC_ROUTES} from './public.routes';
/**
 * Public view of the Application.
 * This section is accessible without any authentication.
 */
@NgModule({
	imports: [RouterModule.forChild(PUBLIC_ROUTES)],
})
export class PublicModule {}
