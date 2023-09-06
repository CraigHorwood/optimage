export enum OptimageQuality {
    LOWER = 10,
    LOW = 25,
    MID = 50,
    STANDARD = 75,
    HIGH = 90,
    HIGHER = 100,
};

export enum OptimageCompressionLevel {
    LOW = 2,
    STANDARD = 5,
    HIGH = 8,
    BEST = 12,
};

// TODO: cropping

export interface OptimageOptions {
	maxSize: number;
	quality?: number;
    compressionLevel?: number;
	width?: number;
    height?: number;
};

export interface OptimageResponse {
	originalSize: number;
	compressedSize: number;
};