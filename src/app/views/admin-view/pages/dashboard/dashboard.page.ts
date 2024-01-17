import {Component, HostBinding, signal} from '@angular/core';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryService} from '../../services/library.service';
import {NotificationService} from '@core/modules/notification';

import {LibraryResource} from '@shared/modules/library/services/library.resource';
import {NgIf} from '@angular/common';
import {UsersTable} from './components/users-table/users.table';
import {UsersResource} from '../../services/users.resource';
import {MatTabsModule} from '@angular/material/tabs';
import {NewsletterTab} from './components/newsletter.tab';
import {SubscriptionTab} from './components/subcriptions.tab';
import {LibraryTab} from './components/library.tab';
@Component({
	standalone: true,
	selector: 'app-dashboard',
	imports: [
		NgIf,
		CardComponent,
		ButtonComponent,
		LoaderComponent,
		UsersTable,
		MatTabsModule,
		NewsletterTab,
		SubscriptionTab,
		LibraryTab,
	],
	providers: [LibraryService, LibraryResource, UsersResource],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = '';
}
