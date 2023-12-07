import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, forwardRef, inject} from '@angular/core';

import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
const MaterialModules = [MatBadgeModule, MatTooltipModule];

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
		TranslatePipe,
		ButtonComponent,
		...MaterialModules,
	],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class')
	protected readonly class = 'mx-6 mt-4 block';

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.subscribed;

	protected currentLesson =
		this.authenticator?.currentUser()?.currentLesson ?? 0;

	constructor(private readonly authenticator: AuthService) {}
}
