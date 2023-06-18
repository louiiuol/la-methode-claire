import {Injectable} from '@angular/core';
import {LocalStore} from '../../storage';

type Theme = 'light' | 'dark';

/**
 * Application's theme management.
 *
 * When application init, this service process the following:
 * * Checks if user prefers dark mode (according to browser color-scheme).
 * * Set current theme for Angular Material & PrimeNG components.
 * * Watches if color-scheme preferences changes and toggle theme accordingly.
 * * Stores current theme in local storage.
 *
 * Note: when dark mode is enabled, <body> will have a ".dark" class
 */
@Injectable()
export class ThemeService {
	private readonly THEME_STORAGE_KEY = 'user-theme';
	private readonly prefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)'
	);

	/**
	 * Current browser/application's theme based on storage and user preferences.
	 */
	currentTheme = this.storage.check(this.THEME_STORAGE_KEY)
		? (this.storage.get(this.THEME_STORAGE_KEY) as Theme)
		: this.getTheme(this.prefersDark.matches);

	constructor(private storage: LocalStore) {
		if (this.currentTheme === 'dark') this.setCurrentTheme(this.currentTheme);
		this.prefersDark.addEventListener('change', e =>
			this.setCurrentTheme(e.matches)
		);
	}

	/**
	 * Toggles current theme between 'light' and 'dark' options.
	 */
	toggleTheme = () =>
		this.setCurrentTheme(this.currentTheme === 'dark' ? 'light' : 'dark');

	private storeTheme = (theme: Theme) =>
		this.storage.set(this.THEME_STORAGE_KEY, theme);

	private setCurrentTheme(theme: Theme | boolean) {
		const currentTheme =
			typeof theme === 'boolean' ? this.getTheme(theme) : theme;
		this.setPrimeThemeCss(currentTheme);
		this.toggleBodyClasses();
		this.currentTheme = currentTheme;
		this.storeTheme(currentTheme);
	}

	private toggleBodyClasses = () => {
		const darkClassName = 'dark';
		const classes = document.body.classList;
		classes.contains(darkClassName)
			? classes.remove(darkClassName)
			: classes.add(darkClassName);
	};

	private setPrimeThemeCss(theme: Theme) {
		const CSS_LOCATION = 'assets/themes/prime';
		const importLink = document.getElementById('theme-link') as HTMLLinkElement;
		importLink.href = `${CSS_LOCATION}-${theme}.css`;
	}

	private getTheme(dark: boolean) {
		return dark ? 'dark' : 'light';
	}
}
