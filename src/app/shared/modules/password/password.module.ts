import {NgModule} from '@angular/core';
import {PasswordService} from './services/password.service';
import {PasswordResource} from './services/password.resource';

@NgModule({
	providers: [PasswordResource, PasswordService],
})
export class PasswordModule {}
