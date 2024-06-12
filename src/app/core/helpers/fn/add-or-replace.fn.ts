export const addOrReplace = <T>(array: T[], obj: T, prop: string): T[] => {
	array ??= [];
	const index = array.findIndex(p => (p as any)[prop] == (obj as any)[prop]);
	if (index !== -1) {
		array[index] = obj;
	} else {
		array.push(obj);
	}
	return array;
};
