import {Component, HostBinding, inject, signal} from '@angular/core';
import {NotificationService} from '@core/modules/notification';
import {
	ButtonComponent,
	IconComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryAdminService} from '../../../../services/library.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AsyncPipe, UpperCasePipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {CourseViewDto} from '@shared/modules/library/types/course-view.dto';
import {MatDialog} from '@angular/material/dialog';
import {CourseEditDialog} from './course-edit/course-edit.dialog';

@Component({
	standalone: true,
	selector: 'app-library-admin',
	imports: [
		IconComponent,
		ButtonComponent,
		LoaderComponent,
		MatTooltipModule,
		AsyncPipe,
		MatTableModule,
		UpperCasePipe,
	],
	providers: [LibraryService],
	templateUrl: 'library.table.html',
})
export class LibraryTable {
	@HostBinding('class') class = 'flex flex-col mx-auto w-full pt-1 px-2';

	loading = signal(false);

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly displayedColumns: string[] = [
		'index',
		'name',
		'script',
		'lesson',
		'exercice',
		'poster',
		'edit',
	];

	constructor(
		private readonly libraryForAdmin: LibraryAdminService,
		private readonly notifier: NotificationService,
		private readonly dialog: MatDialog
	) {}

	protected editCourse(course: CourseViewDto) {
		this.dialog.open(CourseEditDialog, {
			data: course,
			width: '728px',
		});
	}

	protected refresh = () => {
		this.loading.set(true);
		this.libraryForAdmin.refresh().subscribe(() => {
			this.loading.set(false);
			this.notifier.success(
				'Mis à jour avec succès!',
				'La méthode est maintenant à jour!'
			);
		});
	};
}