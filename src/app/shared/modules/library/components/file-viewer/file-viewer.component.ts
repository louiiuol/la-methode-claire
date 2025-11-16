import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	resource,
} from '@angular/core';

import { LoaderComponent, MessageComponent } from '@shared/components/elements';
import { LibraryService } from '@shared/modules/library/services/library.service';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; // https://www.npmjs.com/package/ng2-pdfjs-viewer
import { firstValueFrom } from 'rxjs';

/**
 * Simple component to display a file into an iframe based on given file name.
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-file-viewer',
	host: { class: 'flex w-full h-full' },
	template: `@if (pdf.value(); as pdf) {
			<ng2-pdfjs-viewer
				class="w-full"
				theme="auto"
				[downloadFileName]="fileName()"
				[pdfSrc]="pdf"
				[showAnnotations]="false"
				[showOpenFile]="false"
				[showSpinner]="false"
				[urlValidation]="false" />
		} @else if (pdf.isLoading()) {
			<app-loader />
		} @else {
			<div class="mx-auto mt-24 w-96">
				<h3 class="mb-5 text-3xl text-balance text-center text-primary">
					Impossible de récupérer le fichier
				</h3>
				<img
					class="mx-auto max-w-sm"
					alt="Aucun fichier"
					src="assets/img/no-file.png" />
				<app-message
					class="text-lg"
					severity="error"
					summary="Merci de réessayer ultérieurement" />
			</div>
		} `,
	imports: [MessageComponent, LoaderComponent, PdfJsViewerModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerComponent {
	readonly fileName = input.required<string>();
	readonly textColor = input<string>('black');

	readonly fileLoaded = output<boolean>();

	private readonly library = inject(LibraryService);

	protected readonly pdf = resource({
		params: () => this.fileName(),
		loader: async ({ params: fileName }) => {
			try {
				const res = await firstValueFrom(this.library.getPdf(fileName));
				const blob = new Blob([new Uint8Array(res)], {
					type: 'application/pdf',
				});
				this.fileLoaded.emit(true);
				return URL.createObjectURL(blob);
			} catch (error) {
				this.fileLoaded.emit(true);
				return null;
			}
		},
	});
}
