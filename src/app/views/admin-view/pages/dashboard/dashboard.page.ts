import {Component, HostBinding} from '@angular/core';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryAdminService} from '../../services/library.service';

import {UsersTable} from './components/users-table/users.table';
import {UsersAdminService} from '../../services/users-admin.service';
import {MatTabsModule} from '@angular/material/tabs';
import {NewsletterTab} from './components/newsletter.tab';
import {LibraryTable} from './components/library/library.table';
@Component({
	standalone: true,
	selector: 'app-dashboard',
	imports: [
		CardComponent,
		ButtonComponent,
		LoaderComponent,
		UsersTable,
		MatTabsModule,
		NewsletterTab,
		LibraryTable,
	],
	providers: [LibraryAdminService, UsersAdminService],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = '';
}
