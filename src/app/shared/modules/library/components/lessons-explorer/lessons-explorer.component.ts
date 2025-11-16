import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	resource,
} from '@angular/core';

import { CardComponent, LoaderComponent } from '@shared/components';
import { LibraryModule } from '@shared/modules/library/library.module';
import { LibraryService } from '@shared/modules/library/services/library.service';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-lessons-explorer',
	host: {
		class:
			'p-6 max-w-7xl mx-auto h-full flex flex-col items-center justify-center',
	},
	template: `
		@if (lessons.value(); as lessons) {
			@if (lessons.length && currentCourse(); as currentCourse) {
				<app-progress-bar
					class="rounded-t-xl mat-elevation-z2"
					[currentLessonIndex]="currentLessonIndex()"
					[lessons]="lessons"
					[loading]="loading()"
					(selectedLesson)="
						loading.set(true); currentLessonIndex.set($event)
					" />
				<app-course-viewer
					class="flex-1 w-full"
					[course]="currentCourse"
					(loaded)="loading.set(!$event)" />
			} @else {
				<ng-container *ngTemplateOutlet="inaccessibleMethod"></ng-container>
			}
		} @else if (loading()) {
			<app-loader>Chargement de la bibliothèque.</app-loader>
		} @else {
			<ng-container *ngTemplateOutlet="inaccessibleMethod"></ng-container>
		}
		<ng-template #inaccessibleMethod>
			<app-card class="mt-7 w-80 text-center" title="Méthode inaccessible">
				<img
					class="w-44"
					alt="Not found"
					src="assets/img/illustrations/poster.png" />
				<p>
					La méthode n'est pas disponible pour le moment, merci de revenir plus
					tard.
				</p>
			</app-card>
		</ng-template>
	`,
	imports: [LibraryModule, CardComponent, LoaderComponent, NgTemplateOutlet],
	providers: [LibraryService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsExplorerComponent {
	readonly currentUserLesson = input.required<number>();

	protected readonly library = inject(LibraryService);

	protected readonly currentLessonIndex = linkedSignal(() =>
		this.currentUserLesson()
	);

	protected readonly currentCourse = linkedSignal(() => {
		const lessons = this.lessons.value();
		const index = this.currentLessonIndex();
		const currentCourse = lessons?.[index];

		console.log('Current Lesson Index:', index);

		return currentCourse ?? lessons?.[0] ?? null;
	});

	protected readonly lessons = resource({
		loader: async () => await firstValueFrom(this.library.getLibrary()),
	});

	protected readonly loading = linkedSignal(() => this.lessons.isLoading());
}
