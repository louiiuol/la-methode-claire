import {HttpHeaders} from '@angular/common/http';

export type RequestActions = 'create' | 'get' | 'delete' | 'update';

/**
 * Options to configure http request and related actions.
 */
export interface RequestOptions {
	/**
	 * Url to perform request against
	 */
	path?: string;

	/**
	 * HttpParams for the request
	 */
	params?: {[param: string]: string | string[]};

	/**
	 * HttpHeader for the request
	 */
	headers?: HttpHeaders;

	/**
	 * Forces displaying automated notification when request was successful
	 */
	notifyOnSuccess?: true;

	/**
	 * Disable displaying automated notification when request has errors
	 */
	notifyOnError?: false;

	/**
   * Defines action performed by the request, this optional property is used by HttpResource
   * to notify user of what happened.
   * To use this property, you must define the action in translation files
   *
   * @example
   * <caption>set customAction to 'login'</caption>
   * // /src/assets/i18n/{lang}.json
   * "login": {
				"action": "se connecter",
				"progress": "connection en cours",
				"done": "connecté"
			},
   */
	customAction?: string;
}
