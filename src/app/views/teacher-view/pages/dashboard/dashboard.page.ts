import {Component, HostBinding} from '@angular/core';

import {AuthService} from '@core';
import {LessonsExplorerComponent} from '@shared/modules/library/components/lessons-explorer/lessons-explorer.component';

@Component({
	standalone: true,
	imports: [LessonsExplorerComponent],
	template: `<app-lessons-explorer
		[currentLesson]="authenticator.currentUser()?.currentLesson ?? 0"
		[hasValidSubscription]="!!authenticator.currentUser()?.subscribed" />`,
})
export class DashboardPage {
	@HostBinding('class') class = 'h-full';

	constructor(protected readonly authenticator: AuthService) {}
}
