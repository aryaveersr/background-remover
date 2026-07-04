import { env, ImageSegmentationPipeline, pipeline, RawImage } from '@huggingface/transformers';
import { error } from '@sveltejs/kit';
import path from 'node:path';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const file = form.get('file');

	if (!(file instanceof File)) throw error(400);

	const image = await RawImage.fromBlob(file);
	await removeBackground(image);
	const buffer = await image.toSharp().png().toBuffer();

	return new Response(buffer as unknown as ArrayBuffer, {
		status: 200,
		headers: { 'Content-Type': 'image/png' }
	});
};

async function removeBackground(image: RawImage) {
	if (process.env.NODE_ENV === 'development') {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		image.rgba().grayscale();
	} else {
		const imagePipeline = await getPipeline();
		const output = await imagePipeline(image);
		image.rgba().putAlpha(output[0].mask);
	}
}

env.cacheDir = path.join(process.cwd(), '.model_cache');
let imagePipeline: ImageSegmentationPipeline | undefined;

async function getPipeline() {
	if (!imagePipeline) {
		imagePipeline = await pipeline('image-segmentation', 'onnx-community/BiRefNet-ONNX');
	}

	return imagePipeline;
}
