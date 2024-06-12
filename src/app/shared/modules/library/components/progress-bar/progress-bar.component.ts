import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	Output,
} from '@angular/core';

import {MatTooltipModule} from '@angular/material/tooltip';
import {CourseViewDto} from '../../types/course-view.dto';

@Component({
	selector: 'app-progress-bar',
	standalone: true,
	imports: [MatTooltipModule],
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
	protected readonly class =
		'w-full flex gap-2 items-center justify-start bg-white p-4 overflow-x-auto overscroll-x-contain';

	@Input({required: true}) lessons!: CourseViewDto[];
	@Input({required: true}) currentLesson!: number;
	@Input({required: true}) loading!: boolean;

	/**
	 * Emits new value when user select a new lesson (clicked on lesson button)
	 */
	@Output() selectedLesson = new EventEmitter<number>();

	constructor(private readonly hostElement: ElementRef) {}

	ngAfterViewInit(): void {
		this.hostElement.nativeElement.scrollTo((this.currentLesson - 1) * 48, 0);
	}

	setCurrentLesson = (index: number) => {
		this.currentLesson = index;
		this.selectedLesson.emit(index);
	};
}
