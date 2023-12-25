import {NgIf, DatePipe} from '@angular/common';
import {Component, ViewChild, AfterViewInit, HostBinding} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {UsersResource} from '../../../../services/users.resource';
import {UserPreviewDto} from '@shared/modules';

const MaterialModules = [
	MatProgressSpinnerModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSlideToggleModule,
];

@Component({
	standalone: true,
	selector: 'app-users-list',
	imports: [NgIf, ...MaterialModules, DatePipe],
	templateUrl: 'users.table.html',
})
export class UsersTable implements AfterViewInit {
	@HostBinding('class') class = 'block mx-auto max-w-5xl';

	displayedColumns: string[] = [
		'email',
		'createdAt',
		'currentLesson',
		'active',
		'subscribed',
	];
	data: UserPreviewDto[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private readonly users: UsersResource) {}

	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.users.getUsers(
						this.sort.active,
						this.sort.direction,
						this.paginator.pageIndex
					);
				}),
				map(res => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.isRateLimitReached = res === null;

					if (res === null) {
						return [];
					}

					// Only refresh the result length if there is new data. In case of rate
					// limit errors, we do not want to reset the paginator to zero, as that
					// would prevent users from re-triggering requests.
					this.resultsLength = res.value?.length ?? 0;
					return res.value ?? [];
				})
			)
			.subscribe(data => (this.data = data));
	}

	toggleAccount(user: UserPreviewDto) {
		this.users.toggleActivation(user).subscribe();
	}

	toggleSubscription(user: UserPreviewDto) {
		this.users.toggleSubscription(user).subscribe();
	}
}
