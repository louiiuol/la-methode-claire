import {Component, HostBinding, HostListener} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@shared/components/header/header.component';

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
	imports: [RouterOutlet, HeaderComponent, MatIconButton, MatIcon],
	template: `
		<app-header type="public" />
		<main class="flex-1">
			<router-outlet />
		</main>
		@if (scrolled) {
			<button
				mat-icon-button
				class="!fixed bottom-4 right-4"
				(click)="gotoTop()">
				<mat-icon color="primary">arrow_upward</mat-icon>
			</button>
		}
		<footer class="w-full text-center px-4 py-6 leading-8">
			<p class="mb-2">© {{ currentYear }} <b>La Méthode claire</b>.</p>
			<ul class="flex mx-auto justify-center items-center gap-3">
				@for (social of socials; track social) {
					<li>
						<a [href]="social.path" target="_blank">
							<img
								class="w-8 h-8"
								[src]="
									'https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/socials/' +
									social.name +
									'.png'
								"
								[alt]="social.name + ' logo'" />
						</a>
					</li>
				}
			</ul>
		</footer>
	`,
})
export class PublicView {
	@HostBinding('class') class = 'flex flex-col h-full';

	@HostListener('window:scroll')
	checkScroll() {
		const scrollPosition =
			window.scrollY ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;

		if (scrollPosition >= this.topPosToStartShowing) {
			this.scrolled = true;
		} else {
			this.scrolled = false;
		}
	}

	protected readonly currentYear = new Date().getFullYear();

	protected scrolled = false;
	protected topPosToStartShowing = 500;

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

	gotoTop = () =>
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
}
