import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';

import {MatTooltipModule} from '@angular/material/tooltip';

import {AuthService} from '@core';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		NgFor,
		LibraryModule,
		ButtonComponent,
		CardComponent,
		LoaderComponent,
		MatTooltipModule,
	],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class =
		'p-6 max-w-7xl mx-auto h-full flex flex-col items-center justify-center';

	protected readonly lessons$ = inject(LibraryService).getLibrary();

	protected readonly hasValidSubscription =
		!!this.authenticator.currentUser()?.subscribed;

	protected currentLesson =
		this.authenticator.currentUser()?.currentLesson ?? 0;

	protected isLoading = true;

	constructor(private readonly authenticator: AuthService) {}

	changeLesson = (index: number) => {
		this.isLoading = true;
		this.currentLesson = index;
	};
}
