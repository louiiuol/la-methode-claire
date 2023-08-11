import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {TrustUrlPipe} from '@shared/pipes';
import {TranslatePipe} from '@core';

/**
 * Simple component to display a file into an iframe based on given file name.
 * For now, files must be located in 'assets/pdf/courses/' and should be a `.pdf` file.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	selector: 'app-file-viewer',
	imports: [NgIf, TrustUrlPipe, TranslatePipe],
	templateUrl: './file-viewer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerComponent {
	@Input({required: true}) file: string | null | undefined;

	@HostBinding('class')
	protected readonly class = 'flex w-full h-full';
}
