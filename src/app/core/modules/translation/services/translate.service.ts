import {Injectable} from '@angular/core';
import {TranslateService as NgxTranslateModule} from '@ngx-translate/core';

/**
 * Enumeration of all languages supported by the application
 * @enum
 */
export type SupportedLangs = 'fr';

/**
 * Provides all logic related to application's translation
 *
 * When the application init, this service will process the following:
 * * Adds List of langs available (french & english for now)
 * * Checks browser language preference
 * * Sets current language based on stored language or browser language
 */
@Injectable({providedIn: 'root'})
export class TranslateService {
	/**
	 * Current language active. The value is updated whenever `use(lang)` is called
	 */
	currentLang = this.translator.currentLang;

	constructor(private translator: NgxTranslateModule) {}

	init() {
		this.translator.addLangs(['fr']);
		this.translator.use('fr');
	}

	/**
	 * Set current language to given lang.
	 * This action will also refresh the page in order to fully translate the page
	 * @param lang language to use
	 */
	use = (lang: SupportedLangs) => {
		if (lang !== this.currentLang) {
			this.currentLang = lang;
			this.translator.use(lang);
			location.reload();
		}
	};

	/**
	 * Retrieves all langs available for the application
	 * @returns all langs available for the application
	 */
	getLangs = () => this.translator.getLangs() as SupportedLangs[];

	/**
	 * Translate given key, with current lang active.
	 *
	 * Make sure the key matches a path inside translation files.
	 * If you want to use params inside translation please follow this guide
	 *
	 * @see {@link https://www.vitamindev.com/angular/how-to-use-parameters-in-ngx-translate/ | how-to-use-parameters-in-ngx-translate }
	 * @param key path of the translation
	 * @param params params to interpolate inside translated message
	 * @returns translated message or given key if no translation was found
	 */
	translate = (key: string | string[], params?: object | undefined) =>
		this.translator.instant(key, params);

	/**
	 * Translate given key, with current lang active, and wraps it into an observable.
	 *
	 * Make sure the key matches a path inside translation files.
	 * If you want to use params inside translation please follow this guide
	 *
	 * @see {@link https://www.vitamindev.com/angular/how-to-use-parameters-in-ngx-translate/ | how-to-use-parameters-in-ngx-translate }
	 * @param key path of the translation
	 * @param params params to interpolate inside translated message
	 * @returns Observable containing translated message or given key if no translation was found
	 */
	stream = (key: string | string[], params?: object | undefined) =>
		this.translator.stream(key, params);
}
