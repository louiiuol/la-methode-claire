import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	ViewChild,
} from '@angular/core';

import {MatTooltipModule} from '@angular/material/tooltip';
import {CourseViewDto} from '../../types/course-view.dto';
import {MatButton, MatIconButton} from '@angular/material/button';
import {LibraryService} from '../../services/library.service';
import {take} from 'rxjs/internal/operators/take';
import {AuthService} from '@core';
import {MatIcon} from '@angular/material/icon';

@Component({
	selector: 'app-progress-bar',
	standalone: true,
	imports: [MatTooltipModule, MatIconButton, MatIcon, MatButton],
	templateUrl: './progress-bar.component.html',
	styles: [
		`
			:host {
				scroll-snap-type: inline mandatory;
				scroll-padding-inline: 0.5rem;
				scroll-behavior: smooth;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements AfterViewInit {
	@HostBinding('class')
	protected readonly class = 'w-full flex';

	@Input({required: true}) lessons!: CourseViewDto[];
	@Input({required: true}) currentLesson!: number;
	@Input({required: true}) loading!: boolean;

	/**
	 * Emits new value when user select a new lesson (clicked on lesson button)
	 */
	@Output() selectedLesson = new EventEmitter<number>();

	@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
	protected startX = 0;
	protected scrollLeft = 0;
	protected isDown?: boolean;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}

	ngAfterViewInit(): void {
		this.scrollContainer.nativeElement.scrollTo(
			(this.currentLesson - 1) * 48,
			0
		);
	}

	scroll(direction: 'back' | 'forward') {
		this.scrollContainer.nativeElement.scrollBy({
			left: direction == 'back' ? -96 : 96,
			behavior: 'smooth',
		});
	}

	setCurrentLesson(index: number) {
		if (!this.loading) {
			const reload = index == this.currentLesson;
			this.loading = reload;
			this.library
				.setCurrentLesson(index)
				.pipe(take(1))
				.subscribe(res => {
					if (!res.error) {
						this.currentLesson = index;
						this.authenticator.updateCurrentUser({currentLessonIndex: index});
						this.loading = false;
						this.selectedLesson.emit(index);
					}
				});
		}
	}
}
