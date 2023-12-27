import {NgIf, DatePipe} from '@angular/common';
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
import {UsersResource} from '../../../../services/users.resource';
import {UserPreviewDto} from '@shared/modules';
import {InputSearchComponent} from '@shared/components/form';

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
	imports: [NgIf, ...MaterialModules, DatePipe, InputSearchComponent],
	templateUrl: 'users.table.html',
})
export class UsersTable implements AfterViewInit {
	@HostBinding('class') class = 'block mx-auto max-w-5xl';

	displayedColumns: string[] = [
		'email',
		'createdAt',
		'currentLessonIndex',
		'isActive',
		'subscribed',
	];
	data: UserPreviewDto[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	searchValue = '';

	protected readonly config = signal({
		pagination: {
			index: 0,
			size: 30,
		},
		sortOptions: {
			active: null,
			direction: 'asc',
		},
		filterOptions: {email: null, isActive: null, subscribed: null},
	});

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(InputSearchComponent) search!: InputSearchComponent;

	constructor(private readonly users: UsersResource) {}

	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page, this.search.searchEvent)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					const filter = this.search.searchValue
						? `email:like:${this.search.searchValue}`
						: null;
					return this.users.getUsers(
						this.sort.active,
						this.sort.direction,
						this.paginator.pageIndex,
						this.paginator.pageSize,
						filter
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
					this.resultsLength = items.length;
					return items;
				})
			)
			.subscribe(data => (this.data = data));
	}

	toggleAccount(user: UserPreviewDto) {
		// TODO Revert if failed to update
		this.users.toggleActivation(user).subscribe();
	}

	toggleSubscription(user: UserPreviewDto) {
		this.users.toggleSubscription(user).subscribe();
	}
}
