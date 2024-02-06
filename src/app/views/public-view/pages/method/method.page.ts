import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	imports: [NgIf, NgFor, AsyncPipe, MatTableModule, LibraryModule],
	templateUrl: 'method.page.html',
})
export class MethodPage {
	@HostBinding('class') class = 'block pb-16';

	protected readonly lessons$ = inject(LibraryService).getLibrary();

	displayedColumns: string[] = ['index', 'name'];
}
