export interface CourseViewDto {
	uuid: string;
	order: number;
	phonemes: {uuid: string; name: string}[];
	script: boolean;
	lesson: boolean;
	exercice: boolean;
	text: boolean;
	poster: boolean;
	words: string[];
	[key: string]: any;
}
