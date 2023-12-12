import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, forwardRef, inject} from '@angular/core';

import {MatTooltipModule} from '@angular/material/tooltip';
const MaterialModules = [MatTooltipModule];

import {AuthService} from '@core';
import {ButtonComponent, CardComponent} from '@shared/components';
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
		CardComponent,
		...MaterialModules,
	],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = 'px-6 mt-4 block max-w-7xl mx-auto';

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.subscribed;

	protected currentLesson =
		this.authenticator?.currentUser()?.currentLesson ?? 0;

	constructor(private readonly authenticator: AuthService) {}
}
