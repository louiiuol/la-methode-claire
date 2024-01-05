import {NgIf} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ButtonComponent, IconComponent} from '@shared/components';

@Component({
	standalone: true,
	selector: 'app-filters-menu',
	imports: [
		NgIf,
		ButtonComponent,
		IconComponent,
		MatMenuModule,
		MatSlideToggleModule,
	],
	template: `<app-button type="icon" [matMenuTriggerFor]="menu">
			<app-icon>more_vert</app-icon>
		</app-button>
		<mat-menu #menu="matMenu" xPosition="before">
			<button mat-menu-item>
				<mat-slide-toggle
					(click)="$event.stopPropagation()"
					color="primary"
					[checked]="noFilter"
					(toggleChange)="noFilter = !noFilter">
					Voir tous les membres
				</mat-slide-toggle>
			</button>

			<ng-container *ngIf="!noFilter">
				<button mat-menu-item>
					<mat-slide-toggle color="primary" [checked]="!!filters['isActive']">
						Membres actifs
					</mat-slide-toggle>
				</button>
				<button mat-menu-item>
					<mat-slide-toggle color="primary" [checked]="!!filters['subscribed']">
						Membres abonnés
					</mat-slide-toggle>
				</button>
			</ng-container>
		</mat-menu>`,
})
export class FiltersMenuComponent {
	@Input({required: true}) filters!: {
		[param: string]:
			| string
			| string[]
			| number
			| number[]
			| boolean
			| null
			| undefined;
	};

	@Output() onChange = new EventEmitter();

	noFilter = true;

	updateFilters = (dto: typeof this.filters) =>
		this.onChange.emit({...this.filters, ...dto});

	ignoreFilters = () => this.onChange.emit(null);
}
