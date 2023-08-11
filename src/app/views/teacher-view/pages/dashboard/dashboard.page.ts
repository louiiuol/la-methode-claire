import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, forwardRef, inject} from '@angular/core';
import {AuthService, TranslatePipe} from '@core';
import {ButtonComponent} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		NgFor,
		forwardRef(() => LibraryModule),
		ButtonComponent,
		TranslatePipe,
	],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class')
	protected readonly class = 'p-6';

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly currentUser = inject(AuthService).currentUser();
	protected readonly currentLesson = this.currentUser?.currentLesson ?? 0;
	protected readonly hasValidSubscription =
		!!this.currentUser?.hasValidSubscription;
}
