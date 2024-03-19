import {NgIf} from '@angular/common';
import {Component, HostBinding, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@core';
import {NotificationService} from '@core/modules/notification';
import {ButtonComponent, CardComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [NgIf, CardComponent, ButtonComponent],
	providers: [AuthService],
	template: `<app-card
			*ngIf="!emailSent; else checkYourEmail"
			class="max-w-md"
			cardTitle="Compte inactif"
			subtitle="Ce compte n'est pas actif. Pour le réactiver, merci de confirmer votre adresse email">
			<app-button
				(click)="sendConfirmation()"
				color="accent"
				label="Renvoyer le mail de confirmation"
				type="raised" />
		</app-card>
		<ng-template #checkYourEmail>
			<app-card
				title="Bienvenue sur la méthode claire"
				subtitle="Afin de vérifier votre compte, nous vous avons envoyé un email de vérification.">
				<img
					class="max-w-xs"
					src="https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/email_sent.png"
					alt="email de vérification envoyé" />
			</app-card>
		</ng-template>`,
})
export class InactiveAccountPage {
	@HostBinding('class')
	protected readonly class = 'page centered-content bg-primary';

	protected emailSent = false;

	protected readonly auth = inject(AuthService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly notifier = inject(NotificationService);

	sendConfirmation = () => {
		const email = this.route.snapshot.paramMap.get('email');
		if (email)
			this.auth.sendConfirmationEmail(email).subscribe(res => {
				if (!res.error) this.emailSent = true;
			});
		else
			this.notifier.error(
				'Adresse email invalide',
				"L'adresse email n'est pas conforme"
			);
	};
}
