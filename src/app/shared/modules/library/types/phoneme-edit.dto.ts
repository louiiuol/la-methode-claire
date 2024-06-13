export interface PhonemeEditDto {
	courseUuid: string;
	uuid?: string;
	name?: string;
	poster?: boolean | File;
	endOfWord?: boolean;
	sounds?: string[];
	info?: string;
}
