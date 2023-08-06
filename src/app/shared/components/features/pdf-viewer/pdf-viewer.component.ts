import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	forwardRef,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {TrustUrlPipe} from '@shared/pipes';
import {TranslateModule} from '@core';

@Component({
	standalone: true,
	selector: 'app-pdf-viewer',
	imports: [NgIf, TrustUrlPipe, forwardRef(() => TranslateModule)],
	templateUrl: './pdf-viewer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerComponent {
	@Input({required: true}) file: string | null | undefined;

	@HostBinding('class')
	protected readonly class = 'flex w-full h-full';
}
