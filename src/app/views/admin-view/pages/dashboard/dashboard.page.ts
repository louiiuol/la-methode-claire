import {Component, HostBinding, signal} from '@angular/core';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryService} from '../../services/library.service';
import {NotificationService} from '@core/modules/notification';

import {LibraryResource} from '@shared/modules/library/services/library.resource';
import {NgIf} from '@angular/common';
import {UsersTable} from './components/users-table/users.table';
import {UsersResource} from '../../services/users.resource';

@Component({
	standalone: true,
	selector: 'app-dashboard',
	imports: [NgIf, CardComponent, ButtonComponent, LoaderComponent, UsersTable],
	providers: [LibraryService, LibraryResource, UsersResource],
	templateUrl: './dashboard.page.html',
})
export class DashboardPage {
	@HostBinding('class') class = 'mt-6 flex flex-wrap gap-6 px-6';

	loading = signal(false);

	constructor(
		private readonly library: LibraryService,
		private readonly notifier: NotificationService
	) {}

	protected refresh = () => {
		this.loading.set(true);
		this.library.refresh().subscribe(res => {
			this.loading.set(false);
			this.notifier.success(
				'Mis à jour avec succès!',
				'La méthode est maintenant à jour!'
			);
		});
	};
}
