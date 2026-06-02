import { env, ImageSegmentationPipeline, pipeline, RawImage } from '@huggingface/transformers';
import { error } from '@sveltejs/kit';
import path from 'path';

env.cacheDir = path.join(process.cwd(), '.model_cache');
let imagePipeline: ImageSegmentationPipeline | null = null;

async function getPipeline() {
	if (!imagePipeline) {
		imagePipeline = await pipeline('image-segmentation', 'onnx-community/BiRefNet-ONNX');
	}

	return imagePipeline;
}

async function removeBackground(image: RawImage) {
	if (process.env.NODE_ENV === 'development') {
		await new Promise((resolve) => setTimeout(resolve, 2000));
	} else {
		const imagePipeline = await getPipeline();
		const mask = await imagePipeline(image).then((res) => res[0].mask);
		image.rgba().putAlpha(mask);
	}
}

export const POST = async ({ request }) => {
	const form = await request.formData();
	const file = form.get('file');

	if (!file || !(file instanceof File)) return error(400);

	const image = await RawImage.fromBlob(file);
	await removeBackground(image);
	const buffer = await image.toSharp().png().toBuffer();

	return new Response(buffer as unknown as ArrayBuffer, {
		status: 200,
		headers: { 'Content-Type': 'image/png' }
	});
};
