/**
 * Supported extensions and their types
 */
const extensionsTypes: {[key: string]: string} = {
	pdf: 'application/pdf',
	zip: 'application/zip',
};

/**
 * Simulate a click to save given data as a file, on the user's device.
 * @param data ArrayBuffer to be saved
 * @param fileName name of the file to save
 * @param extension extension of the file
 */
export const saveFile = (
	data: ArrayBuffer | Blob,
	fileName: string,
	extension: 'pdf' | 'zip' = 'pdf'
): void => {
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(
		new Blob([data], {type: extensionsTypes[extension]})
	);
	link.download = `${fileName.replace('files/', '')}.${extension}`; // Set the desired filename & extension
	link.click(); // Trigger download
	window.URL.revokeObjectURL(link.href); // Clean up
};
