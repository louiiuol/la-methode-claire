import {Component} from '@angular/core';
import {NotificationService} from '@core/modules/notification';
import {ButtonComponent, CardComponent} from '@shared/components';
import {UsersAdminService} from '../../../services/users-admin.service';

@Component({
	standalone: true,
	selector: 'app-subscriptions-admin',
	imports: [CardComponent, ButtonComponent],
	template: `<app-card title="Réinitialiser les abonnements">
		<p class="text-primary max-w-xs">
			Ce bouton permet de remettre à zéro l'ensemble des abonnements pour la
			nouvelle année scolaire.
		</p>
		<app-button
			type="flat"
			color="warn"
			label="Réinitialiser"
			(click)="resetSubscriptions()"
			type="menu-item" />
	</app-card>`,
})
export class SubscriptionTab {
	constructor(
		private readonly notifier: NotificationService,
		private readonly users: UsersAdminService
	) {}

	protected resetSubscriptions() {
		if (
			confirm(
				'Êtes vous sûre de vouloir réinitialiser ? Attention, cette action est irréversible.'
			)
		)
			this.users.resetSubscriptions().subscribe(res => {
				if (res.value) {
					this.notifier.success('Abonnements réinitialisés avec succès !');
				}
			});
	}
}
