/**
 * Capitalize given string.
 * @param str text to be capitalized
 * @returns Capitalized string.
 *
 * @author louiiuol
 */
export const capitalize = (str: string) =>
	str.charAt(0).toLocaleUpperCase() + str.slice(1);
