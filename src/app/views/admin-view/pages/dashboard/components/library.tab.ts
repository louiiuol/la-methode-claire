import {Component, signal} from '@angular/core';
import {NotificationService} from '@core/modules/notification';
import {
	ButtonComponent,
	CardComponent,
	LoaderComponent,
} from '@shared/components';
import {LibraryService} from '../../../services/library.service';

@Component({
	standalone: true,
	selector: 'app-library-admin',
	imports: [CardComponent, ButtonComponent, LoaderComponent],
	template: `<app-card
		class="max-w-md"
		title="Rafraîchir la bibliothèque"
		subtitle="Si un problème est détecté concernant la librairie, il est possible de la re-générer.">
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
export class LibraryTab {
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
