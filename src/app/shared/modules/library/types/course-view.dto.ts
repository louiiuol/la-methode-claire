/**
 * Representation of Course returned by API
 */
export interface CourseViewDto {
	uuid: string;
	order: number;
	phonemes: {uuid: string; name: string; poster?: boolean}[];
	script: boolean;
	lesson: boolean;
	exercice: boolean;
	text: boolean;
	poster: boolean;
	words: string[];
	color: string;
	[key: string]: any;
}
