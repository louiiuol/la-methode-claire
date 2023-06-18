/**
 * Represents wrapper for error that occurred because the form is invalid
 */
export interface ApiFormErrorDetails {
	/**
	 * Field's name on which error occurred
	 */
	field?: string;

	/**
	 * List of generic keys explaining error
	 */
	reason: string[];
}
