import {NgIf, DatePipe, NgFor} from '@angular/common';
import {Component, ViewChild, AfterViewInit, HostBinding} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
const MaterialModules = [
	MatProgressSpinnerModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSlideToggleModule,
	MatMenuModule,
	MatSelectModule,
	ClipboardModule,
	MatTooltipModule,
];
import {ClipboardModule, Clipboard} from '@angular/cdk/clipboard';

import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';

import {NotificationService} from '@core/modules/notification';
import {UserPreviewDto} from '@shared/modules';
import {SincePipe} from '@shared/pipes';
import {InputSearchComponent} from '@shared/components/form';
import {ButtonComponent, IconComponent} from '@shared/components';

import {UsersAdminService} from '../../../../services/users-admin.service';
import {FiltersMenuComponent} from './filters-menu/filters-menu.component';
import {MatTooltipModule} from '@angular/material/tooltip';

// const filterOptions = {
//   email: string | null;
//   isActive: boolean | null;
//   subscribed: boolean | null;
// };

@Component({
	standalone: true,
	selector: 'app-users-list',
	imports: [
		NgIf,
		NgFor,
		...MaterialModules,
		DatePipe,
		ButtonComponent,
		IconComponent,
		InputSearchComponent,
		FiltersMenuComponent,
		SincePipe,
	],
	templateUrl: 'users.table.html',
})
export class UsersTable implements AfterViewInit {
	@HostBinding('class') class = 'block mx-auto max-w-5xl mt-3';

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(InputSearchComponent) search!: InputSearchComponent;

	displayedColumns: string[] = [
		'email',
		'firstName',
		'lastName',
		'createdAt',
		'lastConnection',
		'currentLessonIndex',
		'isActive',
		'subscribed',
		'newsletter',
	];
	data: UserPreviewDto[] = [];

	resultsLength = 0;
	isLoadingResults = true;

	searchValue = '';
	searchFields = [
		{viewValue: 'Prénom', value: 'firstName'},
		{viewValue: 'Nom', value: 'lastName'},
		{viewValue: 'Email', value: 'email'},
	];
	searchFieldActive = this.searchFields.at(2);

	constructor(
		private readonly users: UsersAdminService,
		private readonly notifier: NotificationService,
		private readonly clipboard: Clipboard
	) {}

	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page, this.search.searchEvent)
			.pipe(
				startWith({}),
				switchMap(() => {
					// Save config and sync with url
					this.isLoadingResults = true;
					return this.users.getUsers(
						this.sort.active,
						this.sort.direction,
						this.paginator.pageIndex,
						this.paginator.pageSize,
						this.search.searchRequest
					);
				}),
				map(res => {
					this.isLoadingResults = false;
					const items = res?.value?.items ?? [];
					this.resultsLength = res.value?.totalItems ?? 0;
					return items;
				})
			)
			.subscribe(data => (this.data = data));
	}

	toggleAccount(user: UserPreviewDto) {
		this.users.toggleActivation(user).subscribe(res => {
			if (res.error) user.isActive = !user.isActive;
		});
	}

	toggleSubscription(user: UserPreviewDto) {
		this.users.toggleSubscription(user).subscribe(res => {
			if (res.error) user.subscribed = !user.subscribed;
		});
	}

	exportEmails() {
		this.users.exportEmails().subscribe(res => {
			if (res.value?.emails) this.clipboard.copy(res.value.emails);
			this.notifier.success("Liste d'email ajouté au presse-papier.");
		});
	}
}
