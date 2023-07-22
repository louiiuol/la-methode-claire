export type NotificationSeverity =
	| 'info'
	| 'note'
	| 'warn'
	| 'error'
	| 'success';

export interface Notification {
	uuid: string;
	severity: NotificationSeverity;
	summary: string;
	details?: string;
	closable?: true;
	life?: number;
	date?: Date;
}
