import {AsyncPipe, NgFor, NgIf, UpperCasePipe} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	imports: [NgIf, NgFor, AsyncPipe, MatTableModule, UpperCasePipe],
	providers: [LibraryService],
	templateUrl: 'method.page.html',
})
export class MethodPage {
	@HostBinding('class') class = 'block';

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly displayedColumns: string[] = ['index', 'name'];
}
