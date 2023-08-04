import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, forwardRef} from '@angular/core';
import {AuthService} from '@core';
import {ButtonComponent} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';
import {MatBadgeModule} from '@angular/material/badge';

const MaterialModules = [MatBadgeModule];
@Component({
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		NgFor,
		forwardRef(() => LibraryModule),
		ButtonComponent,
		...MaterialModules,
	],
	templateUrl: './progression.page.html',
})
export class ProgressionPage {
	@HostBinding('class') class = 'p-6';

	protected readonly lessons$ = this.library.getLibrary();

	protected currentLesson = this.authenticator?.currentUser?.currentLesson ?? 0;
	protected hasValidSubscription =
		!!this.authenticator?.currentUser?.hasValidSubscription;

	constructor(
		private readonly library: LibraryService,
		private readonly authenticator: AuthService
	) {}

	setCurrentLesson = (index: number) => {
		if (index <= 2 || (index > 2 && this.hasValidSubscription))
			this.currentLesson = index;
	};
}
