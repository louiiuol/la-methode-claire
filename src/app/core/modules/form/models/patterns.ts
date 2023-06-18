import {Validators} from '@angular/forms';

/**
 * Retrieves regExp matching given name
 * @param name pattern's name to be found
 * @returns regex matching given name, empty string otherwise
 */
export function getPattern(name: string) {
	return Validators.pattern(
		APP_FORM_PATTERNS.find(p => p.name === name)?.regex ?? ''
	);
}

/**
 * Retrieves name of the given regExp matching
 * @param regex pattern's regExp to be found
 * @returns name matching given rexExp, empty string otherwise
 */
export function getName(regex: RegExp) {
	return (
		APP_FORM_PATTERNS.find(p => p.regex.toString() === regex.toString())
			?.name ?? ''
	);
}

/**
 * Dictionary of all custom patterns needed by application's FormlyFields
 */
export const APP_FORM_PATTERNS: {name: string; regex: RegExp}[] = [
	{name: 'digit', regex: /\d/g},
	{
		name: 'password',
		regex: /^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/,
	},
];
