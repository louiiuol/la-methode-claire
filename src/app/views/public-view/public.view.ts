import {NgFor} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {HeaderComponent} from '@shared/components';

/**
 * Public View Container, defines global layout.
 * - Sidebar to present Application & display navigation on mobile (not ready yet)
 * - Header with navigation links and Logo (responsive integrated)
 * - <router-outlet> to display children in maximized box (overflow handled)
 *
 * **This container must only contain public actions; At this point, user isn't authenticated yet !**
 */
@Component({
	standalone: true,
	selector: 'app-public-view',
	imports: [RouterOutlet, HeaderComponent, NgFor],
	template: `
		<app-header type="public" />
		<main class="mt-16">
			<router-outlet />
		</main>
		<footer class="w-full text-center px-4 py-6 leading-8">
			<p class="mb-2">© {{ currentYear }} <b>La Méthode claire</b>.</p>
			<ul class="flex mx-auto justify-center items-center gap-3">
				<li *ngFor="let social of socials">
					<a [href]="social.path" target="_blank">
						<img
							class="w-8 h-8"
							[src]="'assets/img/socials/' + social.name + '.png'"
							[alt]="social.name + ' logo'" />
					</a>
				</li>
			</ul>
		</footer>
	`,
})
export class PublicView {
	@HostBinding('class') class = 'app-view';

	protected readonly currentYear = new Date().getFullYear();

	protected readonly socials = [
		// {name: 'twitter', path: '#'},
		// {name: 'linkedin', path: '#'},
		{
			name: 'facebook',
			path: 'https://www.facebook.com/profile.php?id=61557021654442',
		},
		{name: 'pinterest', path: 'https://www.pinterest.fr/methodeclaire/'},
		// {name: 'substack', path: '#'},
		{name: 'instagram', path: 'https://www.instagram.com/methode.claire/'},
	];
}
