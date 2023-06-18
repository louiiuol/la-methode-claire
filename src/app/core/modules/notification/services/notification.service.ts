import {Injectable} from '@angular/core';
import {capitalize} from '@core/helpers';
import {TranslateService} from '@ngx-translate/core';
import {Message, MessageService} from 'primeng/api';

/**
 * Represent a translation key associated with param(s).
 * In order to use this type, you must make sure given params' key names match
 * the ones in translation file
 *
 * @see {@link https://www.vitamindev.com/angular/how-to-use-parameters-in-ngx-translate/ | how-to-use-parameters-in-ngx-translate}
 */
interface TranslateKey {
	key: string;
	param: {[param: string]: string};
}

/**
 * Extends PrimeNG Message and add a `date` property
 *
 * @see {@link https://primeng.org/messages#api.messagesprops:~:text=PrimeNG%20Messages%20module.-,Properties%20of%20Messages,-%23 | PrimeNG Message properties}
 */
interface Notification extends Message {
	date: Date;
}

/**
 * Provides methods to notify translated information to the user.
 *
 * You can define the translation of the messages in two ways:
 * - passing a `string` that core correspond to a translation path
 * - passing a {@link TranslateKey} which contains a `key` (translation path)
 * and params. (more information on type's documentation)
 */
@Injectable()
export class NotificationService {
	/**
	 * List of local notifications (all severities) that happened in user current session.
	 * These notifications are not stored (yet) to browser storage.
	 */
	notifications: Notification[] = [];

	constructor(
		private translator: TranslateService,
		private notifier: MessageService
	) {
		this.notifier.messageObserver.subscribe(messages => {
			if (Array.isArray(messages))
				messages.forEach(m =>
					this.notifications.push({date: new Date(), ...messages})
				);
			else this.notifications.push({date: new Date(), ...messages});
		});
	}

	/**
	 * Send notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param severity level to apply to notification (default is 'info')
	 * @param key id of the container to display notification in
	 */
	notify(
		title: TranslateKey | string,
		message: TranslateKey | string,
		severity = 'info',
		key = 'root'
	) {
		const summary = this.isKeyWithParam(title)
			? this.translate(title.key, title.param)
			: this.translate(title);
		const detail = this.isKeyWithParam(message)
			? this.translate(message.key, message.param)
			: this.translate(message);

		this.notifier.add({
			key,
			severity,
			summary,
			detail,
		});
	}

	/**
	 * Send Success notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param key id of the container to display notification in
	 */
	success = (
		title: TranslateKey | string,
		message: TranslateKey | string,
		key = 'root'
	) => this.notify(title, message, 'success', key);

	/**
	 * Send Error notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param key id of the container to display notification in
	 */
	error = (
		title: TranslateKey | string,
		message: TranslateKey | string,
		key = 'root'
	) => this.notify(title, message, 'error', key);

	/**
	 * Clears local notifications list.
	 */
	clearNotifications() {
		this.notifications = [];
	}

	private translate = (key: string, param?: {[param: string]: string}) =>
		capitalize(this.translator.instant(key, param));

	private isKeyWithParam = (
		tk: TranslateKey | string
	): tk is {key: string; param: {[param: string]: string}} => {
		return (tk as any).key;
	};
}
