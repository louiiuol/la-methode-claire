import {Injectable, signal} from '@angular/core';
import {Notification, NotificationSeverity} from '../types/notification';
import {v4 as uuidV4} from 'uuid';

/**
 * Provides methods to notify information to the user. These notifications will be shown
 * in the app-toaster injected in the root component.
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

	/**
	 * Send notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param severity level to apply to notification (default is 'info')
	 * @param key id of the container to display notification in
	 */
	notify(
		summary: string,
		details: string,
		severity: NotificationSeverity,
		life: number = 4000
	) {
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
	success = (title: string, message: string) =>
		this.notify(title, message, 'success');

	/**
	 * Send Error notification with given params to the user.
	 * @param title key to be displayed for title of the notification
	 * @param message key to be displayed for description of the notification
	 * @param key id of the container to display notification in
	 */
	error = (title: string, message: string) =>
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
