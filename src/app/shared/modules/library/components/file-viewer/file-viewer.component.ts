import {Component, HostBinding, Input, signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {TrustUrlPipe} from '@shared/pipes';
import {TranslatePipe, takeUntilDestroyed} from '@core';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {MessageComponent} from '../../../../components/elements';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {take} from 'rxjs';

/**
 * Simple component to display a file into an iframe based on given file name.
 * For now, files must be located in 'assets/pdf/courses/' and should be a `.pdf` file.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	selector: 'app-file-viewer',
	imports: [
		NgIf,
		TrustUrlPipe,
		TranslatePipe,
		NgxExtendedPdfViewerModule,
		MessageComponent,
	],
	templateUrl: './file-viewer.component.html',
})
export class FileViewerComponent {
	@HostBinding('class')
	protected readonly class = 'flex w-full h-full';

	@Input({required: true}) set fileName(fileName: string) {
		if (fileName.length > 2)
			this.libraryService
				.getPdf(fileName)
				.pipe(take(1))
				.subscribe(res => {
					const blob = new Blob([new Uint8Array(res)], {
						type: 'application/pdf',
					});
					this.pdf$.set(URL.createObjectURL(blob));
				});
	}

	protected pdf$ = signal<any>(null);

	constructor(private readonly libraryService: LibraryService) {}
}
