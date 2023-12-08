/**
 * This function uses a regular expression to match each hyphen followed by a
 * lowercase letter and replaces it with the uppercase version of that letter.
 * This effectively converts dash-case to camelCase.
 */
export const dashToCamelCase = (input: string): string =>
	input.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
