import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	inject,
	signal,
} from '@angular/core';

import {CardComponent, LoaderComponent} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {tap} from 'rxjs';

@Component({
	standalone: true,
	selector: 'app-lessons-explorer',
	imports: [
		AsyncPipe,
		LibraryModule,
		CardComponent,
		LoaderComponent,
		NgTemplateOutlet,
	],
	providers: [LibraryService],
	templateUrl: './lessons-explorer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsExplorerComponent {
	@Input({required: true}) hasValidSubscription!: boolean;

	@Input({required: true}) currentLesson!: number;
	@Input({required: true}) currentUserLesson!: number;

	@HostBinding('class') class =
		'p-6 max-w-7xl mx-auto h-full flex flex-col items-center justify-center';

	loading = signal(true);

	protected readonly lessons$ = inject(LibraryService)
		.getLibrary()
		.pipe(
			tap(() => {
				this.loading.set(false);
			})
		);

	protected isLoading = true;

	protected changeLesson = (index: number) => {
		this.isLoading = true;
		this.currentLesson = index;
	};
}
