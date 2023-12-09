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
import {catchError, tap} from 'rxjs';

@Component({
	standalone: true,
	selector: 'app-dashboard',
	imports: [NgIf, CardComponent, ButtonComponent, LoaderComponent],
	providers: [LibraryService, LibraryResource],

	template: `<app-card
		title="Rafraîchir la bibliothèque"
		subtitle="Si un problème est détecté concernant la librairie, il est possible de la re-générer."
		class="mt-12">
		<app-button
			[disabled]="loading()"
			type="raised"
			color="primary"
			label="Rafraîchir la bibliothèque"
			(click)="refresh()" />
		<ng-template #loadingTemplate>
			<app-loader />
		</ng-template>
	</app-card>`,
})
export class DashboardPage {
	@HostBinding('class') class = 'mt-6';

	loading = signal(false);

	constructor(
		private readonly library: LibraryService,
		private readonly notifier: NotificationService
	) {}

	protected refresh = () => {
		this.loading.set(true);
		this.library.refresh().subscribe(res => {
			this.loading.set(false);
			console.log(res);
			this.notifier.success(
				'Mis à jour avec succès!',
				'La méthode est maintenant à jour!'
			);
		});
	};
}
