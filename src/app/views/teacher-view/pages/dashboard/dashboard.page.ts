import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, forwardRef} from '@angular/core';
import {AuthService} from '@core';
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
	],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = 'p-6';

	lessons$ = this.library.getLibrary();

	protected currentLesson = this.authenticator?.currentUser?.currentLesson ?? 0;

	hasValidSubscription =
		!!this.authenticator?.currentUser?.hasValidSubscription;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}
}
