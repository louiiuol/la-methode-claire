import {NgModule} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

/**
 * Wrapper Module handling notification with primeNG `MessageService`
 *
 * > This module is injected directly into AppModule to ease its integration. You should not have to import it
 * > in any modules, nor provides services, they already injected and available anywhere !
 * @internal
 */
@NgModule({
	imports: [ToastModule],
	exports: [ToastModule],
	providers: [MessageService, NotificationService],
})
export class NotificationModule {}
