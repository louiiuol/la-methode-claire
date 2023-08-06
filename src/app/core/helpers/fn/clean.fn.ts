/**
 * Clean the given object by removing all nullish values.
 *
 * *Including empty string and array.
 * @param obj object to be cleaned
 * @returns Cleaned given object
 *
 * @author louiiuol
 */
export const clean = (
	obj: {[key: string]: unknown} | undefined | null
): any => {
	if (typeof obj === 'object') {
		for (const propName in obj) {
			if (
				(Array.isArray(obj[propName]) &&
					(obj[propName] as Array<unknown>).length === 0) ||
				obj[propName] === null ||
				obj[propName] === undefined ||
				obj[propName] === ''
			) {
				delete obj[propName];
			}
		}
	}
	return obj;
};
