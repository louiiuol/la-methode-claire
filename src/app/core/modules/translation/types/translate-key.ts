/**
 * Represent a translation key associated with param(s).
 * In order to use this type, you must make sure given params' key names match
 * the ones in translation file
 *
 * @see {@link https://www.vitamindev.com/angular/how-to-use-parameters-in-ngx-translate/ | how-to-use-parameters-in-ngx-translate}
 */
export interface TranslateKey {
	key: string;
	param: {[param: string]: string};
}
