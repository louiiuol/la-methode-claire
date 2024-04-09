import {NgIf} from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {nullish} from '@core';
import {ButtonComponent, IconComponent} from '@shared/components';
import {InputSearchComponent} from '@shared/components/form';

@Component({
	standalone: true,
	selector: 'app-filters',
	imports: [
		NgIf,
		ButtonComponent,
		IconComponent,
		FormsModule,
		InputSearchComponent,
		MatCheckboxModule,
		MatMenuModule,
		MatTooltipModule,
	],
	templateUrl: 'filters.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements AfterViewInit {
	@HostBinding('class') class = 'flex items-center justify-start';

	@Input({required: true}) loading!: boolean;

	@Input() set filter(filter: string | nullish) {
		this._filter = filter;
		this.setSearchValues(filter);
	}

	get filter() {
		return this._filter;
	}
	private _filter: string | nullish = null;

	@Output() filterChanged = new EventEmitter<{filter: string | null}>();

	@ViewChild(InputSearchComponent) searchInput!: InputSearchComponent;

	advancedFilters: {active: boolean | nullish; subscribed: boolean | nullish} =
		{
			active: null,
			subscribed: null,
		};
	hideAdvancedFilters = false;

	searchFields = [
		{viewValue: 'Prénom', value: 'firstName'},
		{viewValue: 'Nom', value: 'lastName'},
		{viewValue: 'Email', value: 'email'},
	];
	searchFieldActive = this.searchFields.at(2);

	protected searchValue?: string;

	ngAfterViewInit(): void {
		this.searchInput.searchEvent.subscribe(() => this.emitRequest());
	}

	protected emitRequest() {
		this.filter = this.getAdvancedFilters();
		this.filterChanged.emit({filter: this.getAdvancedFilters()});
	}

	protected setSearchValues(filter: string | nullish) {
		const filters = filter?.split('&') ?? [];
		const searchFields = this.searchFields.map(f => f.value);
		const search = filters.find(f => searchFields.includes(f.split(':')[0]));
		if (search) {
			this.searchInput.setValues(search);
		}
		const activeOnly = filters
			.find(f => f.split(':')[0] == 'isActive')
			?.split(':')[2];
		const subOnly = filters
			.find(f => f.split(':')[0] == 'subscribed')
			?.split(':')[2];

		if (subOnly || activeOnly) {
			this.hideAdvancedFilters = false;
			this.advancedFilters.active = Boolean(Number(activeOnly));
			this.advancedFilters.subscribed = Boolean(Number(subOnly));
		}
	}

	protected resetFilters() {
		this.hideAdvancedFilters = true;
		this.advancedFilters = {active: null, subscribed: null};
		this.filter = null;
		this.searchInput.setValues(null);
		this.filterChanged.next({filter: ''});
	}

	private getAdvancedFilters = () =>
		[
			this.searchInput.searchRequest,
			this.hideAdvancedFilters
				? null
				: `isActive:like:${Number(
						this.advancedFilters.active
				  )}&subscribed:like:${Number(this.advancedFilters.subscribed)}`,
		]
			.filter(x => !!x)
			.join('&');
}
