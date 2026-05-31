import { env, pipeline, RawImage } from '@huggingface/transformers';
import { error } from '@sveltejs/kit';
import path from 'path';

env.cacheDir = path.join(process.cwd(), '.model_cache');
const imagePipeline = await pipeline('image-segmentation', 'onnx-community/BiRefNet-ONNX');

export const POST = async ({ request }) => {
	const form = await request.formData();
	const file = form.get('file');

	if (!file || !(file instanceof File)) return error(400);

	const image = await RawImage.fromBlob(file);
	const mask = await imagePipeline(image).then((res) => res[0].mask);

	image.rgba().putAlpha(mask);
	const buffer = await image.toSharp().png().toBuffer();

	return new Response(buffer as unknown as ArrayBuffer, {
		status: 200,
		headers: { 'Content-Type': 'image/png' }
	});
};
