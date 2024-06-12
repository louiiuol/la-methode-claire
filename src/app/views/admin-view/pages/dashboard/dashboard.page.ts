import {Component} from '@angular/core';

import {UsersTable} from './components/users-table/users.table';
import {MatTabsModule} from '@angular/material/tabs';
import {NewsletterTab} from './components/newsletter.tab';
import {LibraryTable} from './components/library/library.table';

@Component({
	standalone: true,
	selector: 'app-dashboard',
	imports: [MatTabsModule, UsersTable, NewsletterTab, LibraryTable],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {}
