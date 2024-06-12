import {AsyncPipe} from '@angular/common';
import {Component, HostBinding, Input, inject} from '@angular/core';

import {CardComponent, LoaderComponent} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	selector: 'app-lessons-explorer',
	imports: [AsyncPipe, LibraryModule, CardComponent, LoaderComponent],
	providers: [LibraryService],
	templateUrl: './lessons-explorer.component.html',
})
export class LessonsExplorerComponent {
	@Input({required: true}) hasValidSubscription!: boolean;

	@Input({required: true}) currentLesson!: number;
	@Input({required: true}) currentUserLesson!: number;

	@HostBinding('class') class =
		'p-6 max-w-7xl mx-auto h-full flex flex-col items-center justify-center';

	protected readonly lessons$ = inject(LibraryService).getLibrary();

	protected isLoading = true;

	protected changeLesson = (index: number) => {
		this.isLoading = true;
		this.currentLesson = index;
	};
}
