import {ChangeDetectionStrategy, Component} from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {LibraryTable} from './components/library/library.table';
import {NewsletterTab} from './components/newsletter.tab';
import {UsersTable} from './components/users-table/users.table';

@Component({
	selector: 'app-dashboard',
	template: `<mat-tab-group class="w-full" style="height: calc(100dvh - 64px)">
		<mat-tab label="Utilisateurs"> <app-users-list /> </mat-tab>
		<mat-tab label="Newsletter"> <app-newsletter-admin /> </mat-tab>
		<mat-tab label="Bibliothèque"><app-library-admin /> </mat-tab>
	</mat-tab-group>`,
	imports: [MatTabsModule, UsersTable, NewsletterTab, LibraryTable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
