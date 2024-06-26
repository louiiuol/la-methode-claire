import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
const MaterialModules = [
	MatToolbarModule,
	MatMenuModule,
	MatButtonModule,
	MatIcon,
];

import {AuthService, PlatformService} from '@core';
import {IconComponent} from '@shared/components';
import {navigationLinks} from 'src/app/app.routes';
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {InitialsPipe} from '../../pipes/initials.pipe';
import {MatIcon} from '@angular/material/icon';

/**
 * Logged views global header
 *
 * Contains navigation links and preference buttons (heme & lang)
 */
@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [...MaterialModules, IconComponent, RouterLink, InitialsPipe],
})
export class HeaderComponent {
	/**
	 * Emits when "hamburger" button is clicked.
	 * This event will be used by {@link TeacherPage} to toggle Sidebar display mode.
	 */
	@Output() toggledMobileMenu = new EventEmitter();

	@Input({required: true}) type!: 'public' | 'logged' | 'admin';

	@HostBinding('class')
	protected class = 'w-full sticky top-0 mat-elevation-z2 z-50';

	protected currentUser = this.authenticator.currentUser();
	protected readonly navigationLinks = navigationLinks;

	constructor(
		private readonly platform: PlatformService,
		private readonly authenticator: AuthService,
		private readonly cd: ChangeDetectorRef
	) {}

	protected isMobile = () => this.platform.isMobileView();
	protected logOut = () => {
		this.authenticator.logOut();
		this.cd.detectChanges();
	};
}
