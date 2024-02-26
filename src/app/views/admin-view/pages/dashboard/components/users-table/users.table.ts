import {NgIf, DatePipe, NgFor} from '@angular/common';
import {
	Component,
	ViewChild,
	AfterViewInit,
	HostBinding,
	signal,
} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {UsersAdminService} from '../../../../services/users-admin.service';
import {UserPreviewDto} from '@shared/modules';
import {InputSearchComponent} from '@shared/components/form';
import {MatMenuModule} from '@angular/material/menu';
import {ButtonComponent, IconComponent} from '@shared/components';
import {FiltersMenuComponent} from './filters-menu/filters-menu.component';
import {SearchField} from '@shared/components/form/input-search/types/search-field';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {Clipboard} from '@angular/cdk/clipboard';
import {NotificationService} from '@core/modules/notification';
const MaterialModules = [
	MatProgressSpinnerModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSlideToggleModule,
	MatMenuModule,
	MatSelectModule,
	ClipboardModule,
];

type TableConfig = {
	pagination: {
		index: number;
		size: number;
	};
	sortOptions: {
		active: string | null;
		direction: 'asc' | 'desc' | '';
	};
	filterOptions: {
		email: string | null;
		isActive: boolean | null;
		subscribed: boolean | null;
	};
};

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
	],
	templateUrl: 'users.table.html',
})
export class UsersTable implements AfterViewInit {
	@HostBinding('class') class = 'block mx-auto max-w-5xl mt-3';

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
	isRateLimitReached = false;

	searchValue = '';

	searchFields = [
		{viewValue: 'Prénom', value: 'firstName'},
		{viewValue: 'Nom', value: 'lastName'},
		{viewValue: 'Email', value: 'email'},
	];
	searchFieldActive = this.searchFields.at(2);

	// protected readonly config = signal<TableConfig>({
	// 	pagination: {
	// 		index: 0,
	// 		size: 30,
	// 	},
	// 	sortOptions: {
	// 		active: null,
	// 		direction: 'asc',
	// 	},
	// 	filterOptions: {email: null, isActive: null, subscribed: null},
	// });

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(InputSearchComponent) search!: InputSearchComponent;

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
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					const items = res?.value?.items ?? [];
					this.isRateLimitReached = items === null;
					if (this.isRateLimitReached) return items;

					// Only refresh the result length if there is new data. In case of rate
					// limit errors, we don't want to reset the paginator, as that would prevent re-triggering requests.
					this.resultsLength = res.value?.totalItems ?? 0;
					return items;
				})
			)
			.subscribe(data => (this.data = data));
	}

	// // Set config
	// saveConfig(input: Partial<TableConfig>) {
	// 	const config = this.config();
	// 	// this.sort.sortChange, this.paginator.page, this.search.searchEvent
	// 	this.config.set({
	// 		pagination: {
	// 			index: this.paginator.pageIndex,
	// 			size: this.paginator.pageSize,
	// 		},
	// 		sortOptions: {active: this.sort.active, direction: this.sort.direction},
	// 		filterOptions: {
	// 			email: this.search.value,
	// 			subscribed: config.filterOptions.subscribed,
	// 			isActive: null,
	// 		},
	// 	});
	// 	// Sync with url
	// 	return this.config();
	// }

	// Refresh view

	toggleAccount(user: UserPreviewDto) {
		// TODO Revert if failed to update
		this.users.toggleActivation(user).subscribe();
	}

	toggleSubscription(user: UserPreviewDto) {
		this.users.toggleSubscription(user).subscribe();
	}

	exportEmails() {
		this.users.exportEmails().subscribe(res => {
			if (res.value?.emails) this.clipboard.copy(res.value.emails);
			this.notifier.success("Liste d'email ajouté au presse-papier.");
		});
	}
}
