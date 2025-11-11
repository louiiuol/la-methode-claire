import {
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject,
	input,
	model,
	output,
	viewChild,
} from '@angular/core';

import {MatIcon} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AuthService} from '@core';
import {take} from 'rxjs/internal/operators/take';
import {LibraryService} from '../../services/library.service';
import {CourseViewDto} from '../../types/course-view.dto';

@Component({
	selector: 'app-progress-bar',
	host: {
		class: 'w-full flex overflow-hidden',
		style: 'border-radius: 0.5rem 0.5rem 0px 0px;',
	},
	template: `<button
			class="flex justify-center items-center bg-white w-12"
			(click)="scroll('back')">
			<mat-icon class="!w-4" color="primary">arrow_back_ios</mat-icon>
		</button>
		<nav
			class="flex flex-1 justify-start items-center gap-2 bg-white shadow-inner p-4 overflow-x-auto overscroll-x-contain"
			#scrollContainer>
			@for (lesson of lessons(); track lesson) {
				<button
					[id]="'course-' + lesson.order"
					class="flex justify-center items-center !border-current bg-texture snap-start border rounded-full w-12 h-12 leading-none select-none shrink-0"
					[style]="
						'color:' +
						(lesson.order === currentLesson() ? 'white' : lesson.color) +
						'!important; background-color:' +
						(lesson.order === currentLesson() ? lesson.color : 'transparent')
					"
					[class]="{
						'font-bold': lesson.order === currentLesson(),
						'opacity-30': loading(),
						'cursor-wait': loading(),
					}"
					(click)="
						!loading() &&
							currentLesson() !== lesson.order &&
							setCurrentLesson(lesson.order)
					">
					<div class="flex justify-center items-center w-6 h-6 text-xl">
						{{ (lesson.order + 1).toFixed() }}
					</div>
				</button>
			}
		</nav>
		<button
			class="flex justify-center items-center bg-white w-12"
			(click)="scroll('forward')">
			<mat-icon class="!pr-5 !w-4" color="primary">arrow_forward_ios</mat-icon>
		</button> `,
	styles: [
		`
			:host {
				scroll-snap-type: inline mandatory;
				scroll-padding-inline: 0.5rem;
				scroll-behavior: smooth;
			}
		`,
	],
	imports: [MatTooltipModule, MatIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
	readonly lessons = input.required<CourseViewDto[]>();

	readonly currentLesson = model.required<number>();
	readonly loading = model.required<boolean>();

	readonly selectedLesson = output<number>();

	private readonly library = inject(LibraryService);
	private readonly authenticator = inject(AuthService);

	private readonly scrollContainer = viewChild('scrollContainer', {
		read: ElementRef<HTMLElement>,
	});

	private readonly syncScrollWithCurrentLesson = effect(() => {
		const lessons = this.lessons();
		const container = this.scrollContainer();
		const lessonIndex = this.currentLesson();

		if (!container || !lessons?.length) {
			return;
		}

		const run = () =>
			this.scrollLessonIntoView(container.nativeElement, lessonIndex);

		if (typeof window === 'undefined') {
			run();
			return;
		}

		window.requestAnimationFrame(run);
	});

	protected scroll(direction: 'back' | 'forward') {
		this.scrollContainer()?.nativeElement.scrollBy({
			left: direction == 'back' ? -96 : 96,
			behavior: 'smooth',
		});
	}

	protected setCurrentLesson(index: number) {
		if (!this.loading()) {
			const reload = index == this.currentLesson();
			this.loading.set(reload);
			this.library
				.setCurrentLesson(index)
				.pipe(take(1))
				.subscribe(res => {
					if (!res.error) {
						this.currentLesson.set(index);
						this.authenticator.updateCurrentUser({currentLessonIndex: index});
						this.loading.set(false);
						this.selectedLesson.emit(index);
					}
				});
		}
	}

	private scrollLessonIntoView(container: HTMLElement, lessonIndex: number) {
		const currentLessonButton = container.querySelector<HTMLElement>(
			`#course-${lessonIndex}`
		);

		if (!currentLessonButton) {
			return;
		}

		const centeredOffset =
			currentLessonButton.offsetLeft -
			(container.clientWidth - currentLessonButton.offsetWidth) / 2;

		const targetOffset = Math.min(
			Math.max(centeredOffset, 0),
			container.scrollWidth - container.clientWidth
		);

		container.scrollTo({
			left: targetOffset,
			behavior: 'smooth',
		});
	}
}
