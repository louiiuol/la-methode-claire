import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	signal,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {catchError, take} from 'rxjs';
import {TrustUrlPipe} from '@shared/pipes';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {LoaderComponent, MessageComponent} from '@shared/components/elements';

/**
 * Simple component to display a file into an iframe based on given file name.
 *
 * @author louiiuol
 */
@Component({
	standalone: true,
	selector: 'app-file-viewer',
	imports: [NgIf, TrustUrlPipe, MessageComponent, LoaderComponent],
	templateUrl: './file-viewer.component.html',
})
export class FileViewerComponent {
	@HostBinding('class')
	protected readonly class = 'flex w-full h-full';

	@Input({required: true}) set fileName(fileName: string) {
		this.pdf.set(null);
		if (fileName.length > 2)
			this.libraryService
				.getPdf(fileName)
				.pipe(take(1))
				.pipe(
					catchError(res => {
						this.failedToLoad = !res.ok;
						this.fileLoaded.emit(false);
						throw res;
					})
				)
				.subscribe((res: any) => {
					const blob = new Blob([new Uint8Array(res)], {
						type: 'application/pdf',
					});
					this.pdf.set(URL.createObjectURL(blob));
					this.fileLoaded.emit(true);
				});
	}

	@Output() fileLoaded = new EventEmitter();

	protected pdf = signal<any>(null);
	failedToLoad = false;

	constructor(private readonly libraryService: LibraryService) {}
}
