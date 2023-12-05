/**
 * Representation of Course returned by API
 */
export interface CourseViewDto {
	uuid: string;
	order: number;
	phonemes: {uuid: string; name: string; poster?: boolean}[];
	color: string;
	script?: boolean;
	lesson?: boolean;
	exercice?: boolean;
	poster?: boolean;
	sounds?: string[];
	words?: string[];
	[key: string]: any;
}
