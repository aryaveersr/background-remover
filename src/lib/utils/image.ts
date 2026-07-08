export const mimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/tiff'];
export const extensions = '.png, .jpg/jpeg, .webp, .avif, .tif/tiff';

export function getImages(dataTransfer: DataTransfer) {
	return [...dataTransfer.items]
		.filter((item) => item.kind == 'file')
		.filter((item) => mimeTypes.includes(item.type))
		.map((item) => item.getAsFile()!);
}
