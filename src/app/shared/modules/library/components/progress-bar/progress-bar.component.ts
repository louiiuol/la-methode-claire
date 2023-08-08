import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
import {NgFor, ViewportScroller} from '@angular/common';
import {ButtonComponent} from '@shared/components';
import {CourseViewDto} from '../../types/course-view.dto';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@core';

@Component({
	selector: 'app-progress-bar',
	standalone: true,
	imports: [
		NgFor,
		ButtonComponent,
		MatTooltipModule,
		forwardRef(() => TranslateModule),
	],
	templateUrl: './progress-bar.component.html',
	styles: [
		`
			:host {
				scroll-snap-type: inline mandatory;
				scroll-padding-inline: 0.5rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements AfterViewInit {
	@HostBinding('class')
	protected readonly class =
		'w-full flex gap-2 items-center justify-start bg-slate-300 p-4 overflow-x-auto overscroll-x-contain';

	@Input({required: true}) lessons!: CourseViewDto[];
	@Input({required: true}) currentLesson!: number;
	@Input({required: true}) hasValidSubscription!: boolean;

	@Output() selectedLesson = new EventEmitter<number>();

	constructor(private readonly hostElement: ElementRef) {}
	ngAfterViewInit(): void {
		this.hostElement.nativeElement.scrollTo((this.currentLesson - 1) * 48, 0);
	}

	setCurrentLesson = (index: number) => {
		if (index <= 2 || (index > 2 && this.hasValidSubscription)) {
			this.currentLesson = index;
			this.selectedLesson.emit(index);
		}
	};
}