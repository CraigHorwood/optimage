import { FfmpegCommand } from 'fluent-ffmpeg';
import { Readable, PassThrough } from 'stream';

export function optimageConvert(buffer: Buffer): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const image = new Readable();
		image._read = () => {};
		image.push(buffer);
		image.push(null);
		const chunks: Buffer[] = [];
		const passThrough = new PassThrough();
		const command = new FfmpegCommand();
		command.input(image).outputFormat('webp').on('error', reject).stream(passThrough, { end: true });
		passThrough.on('data', (data) => chunks.push(data));
		passThrough.on('error', reject);
		passThrough.on('end', () => {
			const fix = Buffer.concat(chunks).copyWithin(-4, 4).subarray(0, -4);
			return resolve(fix);
		});
	});
}