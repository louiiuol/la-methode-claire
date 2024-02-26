import {Component, HostBinding} from '@angular/core';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryService} from '../../services/library.service';
import {NgIf} from '@angular/common';
import {UsersTable} from './components/users-table/users.table';
import {UsersAdminService} from '../../services/users-admin.service';
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
	providers: [LibraryService, UsersAdminService],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = '';
}
