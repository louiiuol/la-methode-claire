import {Injectable, signal} from '@angular/core';
import {Notification, NotificationSeverity} from '../types/notification';
import {TranslateKey, TranslateService} from '@core/modules/translation';
import {v4 as uuidV4} from 'uuid';

/**
 * Provides methods to notify translated information to the user.
 *
 * You can define the translation of the messages in two ways:
 * - passing a `string` that core correspond to a translation path
 * - passing a {@link TranslateKey} which contains a `key` (translation path)
 * and params. (more information on `TranslateKey` type's documentation)
 *
 * @author louiiuol
 */
@Injectable({providedIn: 'root'})
export class NotificationService {
	/**
	 * List of local notifications (all severities) that happened in user current session.
	 * These notifications are not stored (yet) to browser storage.
	 */
	notifications = signal<Notification[]>([]);

	constructor(private translator: TranslateService) {}

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
		severity: NotificationSeverity,
		life: number = 4000
	) {
		const summary = this.translator.translate(title);
		const details = this.translator.translate(message);
		const uuid: string = uuidV4();
		this.notifications().push({
			uuid,
			severity,
			summary,
			details,
			date: new Date(),
		});
		setTimeout(() => this.removedNotification(uuid), life);
	}

	/**
	 * Send Success notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param key id of the container to display notification in
	 */
	success = (title: TranslateKey | string, message: TranslateKey | string) =>
		this.notify(title, message, 'success');

	/**
	 * Send Error notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param key id of the container to display notification in
	 */
	error = (title: TranslateKey | string, message: TranslateKey | string) =>
		this.notify(title, message, 'error');

	/**
	 * Clears local notifications list.
	 */
	clearNotifications() {
		this.notifications = signal<Notification[]>([]);
	}

	removedNotification(uuid: string) {
		this.notifications.set(this.notifications().filter(n => n.uuid !== uuid));
	}
}
