export const supportedMimeTypes = [
	'image/png',
	'image/jpeg',
	'image/webp',
	'image/avif',
	'image/tiff'
];

export const supportedExtensions = '.png, .jpg/jpeg, .webp, .avif, .tif/tiff';

export type Merge<A, B> = A & Omit<B, keyof A>;
