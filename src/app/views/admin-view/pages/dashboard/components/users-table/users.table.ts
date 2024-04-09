import {NgIf, DatePipe, NgFor} from '@angular/common';
import {
	Component,
	ViewChild,
	AfterViewInit,
	HostBinding,
	OnInit,
} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
const MaterialModules = [
	MatProgressBarModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSlideToggleModule,
	MatMenuModule,
	ClipboardModule,
	MatTooltipModule,
];
import {ClipboardModule, Clipboard} from '@angular/cdk/clipboard';

import {ActivatedRoute, Router} from '@angular/router';

import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';

import {NotificationService} from '@core/modules/notification';
import {PaginationFilters} from '@core/helpers/types/pagination-filters';
import {clean} from '@core';
import {UserPreviewDto} from '@shared/modules';
import {SincePipe} from '@shared/pipes';
import {ButtonComponent, IconComponent} from '@shared/components';

import {UsersAdminService} from '../../../../services/users-admin.service';
import {FiltersComponent} from './filters/filters.component';

@Component({
	standalone: true,
	selector: 'app-users-list',
	imports: [
		NgIf,
		NgFor,
		...MaterialModules,
		DatePipe,
		SincePipe,
		ButtonComponent,
		IconComponent,
		FiltersComponent,
	],
	templateUrl: 'users.table.html',
})
export class UsersTable implements OnInit, AfterViewInit {
	@HostBinding('class') class = 'flex flex-col mx-auto w-full pt-1 px-2';

	@ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	displayedColumns = [
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

	filters: PaginationFilters = {
		page: 0,
		size: 10,
		sort: 'lastConnection:desc',
	};

	resultsLength = 0;
	isLoadingResults = true;

	constructor(
		private readonly users: UsersAdminService,
		private readonly notifier: NotificationService,
		private readonly clipboard: Clipboard,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		this.setFilters(this.route.snapshot.queryParams);
	}

	ngAfterViewInit() {
		// If the user changes the sort order or filters, reset back to the first page.
		merge(this.sort.sortChange, this.filtersComponent.filterChanged).subscribe(
			() => (this.paginator.pageIndex = 0)
		);
		this.filtersComponent.filter = this.filters.filter;
		merge(
			this.sort.sortChange,
			this.paginator.page,
			this.filtersComponent.filterChanged
		)
			.pipe(
				startWith({firstRequest: true}),
				switchMap((req: any) => {
					this.isLoadingResults = true;
					this.filters = clean(
						req?.['firstRequest'] ? this.filters : this.getFilters()
					);
					return this.users.getUsers(this.filters);
				}),
				map(res => {
					this.syncParams(this.filters);
					this.resultsLength = res.value?.totalItems ?? 0;
					this.isLoadingResults = false;
					return res?.value?.items ?? [];
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

	private setFilters(params: PaginationFilters) {
		this.filters = clean({...this.filters, ...params});
	}

	private getFilters() {
		return {
			filter: this.filtersComponent.filter,
			sort: [this.sort.active, this.sort.direction].join(':'),
			page: this.paginator.pageIndex,
			size: this.paginator.pageSize,
		};
	}

	// saves config and sync with url
	private syncParams = (params: PaginationFilters) => {
		this.setFilters(params);
		this.router.navigate(['/back-office/dashboard'], {
			queryParams: clean(params),
		});
	};
}
