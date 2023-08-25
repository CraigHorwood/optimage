import * as Ffmpeg from 'fluent-ffmpeg';
import { Readable, PassThrough } from 'stream';

// TODO: Set specific size in pixels, cropping

export interface OptimageOptions {
	maxSize: number;
	quality?: string;
	scaling?: string;
};

export interface OptimageResponse {
	originalSize: number;
	compressedSize: number;
};

export function optimageConvert(buffer: Buffer, options: OptimageOptions = { maxSize: 1024*1024 }): Promise<OptimageResponse> {
	const originalSize = buffer.length;
	return new Promise((resolve, reject) => {
		const image = new Readable();
		image._read = () => {};
		image.push(buffer);
		image.push(null);
		const chunks: Buffer[] = [];
		const passThrough = new PassThrough();

		let command = Ffmpeg().input(image).outputFormat('webp');
		if (options.quality) {
			command = command.outputOptions(['-quality', options.quality]);
		}
		if (options.scaling) {
			command = command.size(options.scaling);
		}
		command.on('error', reject).stream(passThrough, { end: true });

		passThrough.on('data', (data) => { chunks.push(data) });
		passThrough.on('error', reject);
		passThrough.on('end', () => {
			const fix = Buffer.concat(chunks).copyWithin(-4, 4).subarray(0, -4);
			if (fix.length > options.maxSize) {
				return reject(new Error(`Compressed file is larger than ${options.maxSize} bytes (${fix.length} bytes).`));
			}
			return resolve({ 
				originalSize,
				compressedSize: fix.length,
			});
		});
	});
}