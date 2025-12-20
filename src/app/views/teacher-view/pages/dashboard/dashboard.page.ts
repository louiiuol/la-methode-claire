import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthService } from '@core';
import { LessonsExplorerComponent } from '@shared/modules/library/components/lessons-explorer/lessons-explorer.component';

@Component({
	selector: 'app-teacher-dashboard-page',
	host: { class: 'h-full' },
	template: ` <app-lessons-explorer
		[currentUserLesson]="
			authenticator.currentUser()?.currentLessonIndex ?? 0
		" />`,
	imports: [LessonsExplorerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
	protected readonly authenticator = inject(AuthService);
}
