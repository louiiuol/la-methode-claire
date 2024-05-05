import {Component, HostBinding, inject} from '@angular/core';

import {AuthService} from '@core';
import {LessonsExplorerComponent} from '@shared/modules/library/components/lessons-explorer/lessons-explorer.component';

@Component({
	standalone: true,
	imports: [LessonsExplorerComponent],
	template: `<app-lessons-explorer
		[currentUserLesson]="currentUserLesson"
		[currentLesson]="currentUserLesson"
		[hasValidSubscription]="subscribed" />`,
})
export class DashboardPage {
	@HostBinding('class') class = 'h-full';

	protected readonly authenticator = inject(AuthService);
	protected readonly currentUserLesson =
		this.authenticator.currentUser()?.currentLessonIndex ?? 0;
	protected readonly subscribed =
		!!this.authenticator.currentUser()?.subscribed;
}
