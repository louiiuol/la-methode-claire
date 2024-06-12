import {Component, inject} from '@angular/core';
import {NotificationService} from '@core/modules/notification';
import {CardComponent, FormComponent} from '@shared/components';
import {UsersAdminService} from '../../../services/users-admin.service';
import {NewsletterService} from '../../../services/newsletter.service';
import {FieldConfig} from '@core';

@Component({
	standalone: true,
	selector: 'app-newsletter-admin',
	imports: [CardComponent, FormComponent],
	providers: [NewsletterService, UsersAdminService],
	template: ` <app-card
		title="Nouvelle newsletter"
		subtitle="Envoyer un email aux utilisateurs abonnés à la méthode.">
		<img src="assets/img/banner.png" alt="" />
		<app-form
			action="Envoyer"
			[submitted]="sendNewsletter"
			[fields]="fields"
			[askConfirmation]="true"
			[forceReset]="true" />
	</app-card>`,
})
export class NewsletterTab {
	constructor(
		private readonly notifier: NotificationService,
		private readonly users: UsersAdminService
	) {}

	protected readonly fields: FieldConfig[] = [
		{
			key: 'subject',
			props: {
				required: true,
				type: 'text',
				label: 'Sujet de la Newsletter',
			},
		},
		{
			key: 'intro',
			type: 'textarea',
			props: {
				required: true,
				autosize: true,
				label: 'Introduction (visible sans abonnement à la méthode)',
			},
		},
		{
			key: 'content',
			type: 'textarea',
			props: {
				required: true,
				autosize: true,
				label: 'Contenu pour les abonnés',
			},
		},
	];

	protected sendNewsletter = inject(NewsletterService).sendNews;

	protected resetSubscriptions() {
		this.users.resetSubscriptions().subscribe(res => {
			if (res.value) {
				this.notifier.success('Abonnements réinitialisés avec succès !');
			}
		});
	}
}
