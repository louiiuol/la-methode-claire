import {Component, HostBinding, ViewChild, inject, signal} from '@angular/core';
import {NotificationService} from '@core/modules/notification';
import {LoaderComponent} from '@shared/components';
import {LibraryAdminService} from '../../../../services/library.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AsyncPipe, UpperCasePipe} from '@angular/common';
import {MatTable, MatTableModule} from '@angular/material/table';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';

import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {CourseEditComponent} from '../../../../../../shared/modules/library/components/course-edit/course-edit.component';
import {
	CdkDropList,
	DragDropModule,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {MatIcon} from '@angular/material/icon';
import {take} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';

const MaterialModules = [
	MatIcon,
	MatIconButton,
	MatButton,
	MatTooltipModule,
	MatTableModule,
	MatSidenavModule,
];

@Component({
	standalone: true,
	selector: 'app-library-admin',
	imports: [
		LoaderComponent,
		AsyncPipe,
		UpperCasePipe,
		...MaterialModules,
		CourseEditComponent,
		DragDropModule,
		CdkDropList,
		CdkTableModule,
	],
	providers: [LibraryService, LibraryAdminService],
	styles: [
		`
			.mat-column-name {
				flex: 5;
			}
		`,
	],
	templateUrl: 'library.table.html',
})
export class LibraryTable {
	@HostBinding('class') class = 'flex flex-col mx-auto w-full pt-1 px-2';
	@ViewChild('table', {static: false}) table!: MatTable<CourseViewDto>;
	@ViewChild('sidenav', {static: false}) sideNav!: MatSidenav;
	loading = signal(false);

	selectedLesson: any;
	dragDisabled = true;
	protected dataSource: CourseViewDto[] = [];
	protected readonly displayedColumns: string[] = ['index', 'name', 'edit'];

	constructor(
		private readonly libraryForAdmin: LibraryAdminService,
		private readonly notifier: NotificationService
	) {
		inject(LibraryService)
			.getLibrary()
			.subscribe(res => {
				if (res) this.dataSource = res;
			});
	}

	protected editCourse(course: CourseViewDto) {
		this.selectedLesson = course;
		this.sideNav.open();
	}

	protected drop(event: any) {
		// Return the drag container to disabled.
		this.dragDisabled = true;

		const previousIndex = this.dataSource.findIndex(d => d === event.item.data);
		moveItemInArray(this.dataSource, previousIndex, event.currentIndex);

		this.libraryForAdmin
			.reOrder({newOrder: this.dataSource.map(x => x.uuid)})
			.subscribe(res => {
				if (res.value) this.dataSource = res.value;
				this.table.renderRows();
			});
	}

	protected createCourse() {
		this.libraryForAdmin
			.createCourse()
			.pipe(take(1))
			.subscribe(res => {
				if (res.value) this.dataSource.push(res.value);
				this.table.renderRows();
			});
	}

	protected deleteCourse(course: CourseViewDto) {
		if (
			confirm(
				`Êtes vous sûr de vouloir supprimer la leçon N°${course.order + 1} ?`
			)
		)
			this.libraryForAdmin.deleteCourse(course.uuid).subscribe(() => {
				this.dataSource = this.dataSource.filter(i => i.uuid != course.uuid);
				this.table.renderRows();
			});
	}
}
