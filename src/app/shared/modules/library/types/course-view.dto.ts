import {PhonemeViewDto} from './phoneme-view.dto';

/**
 * Representation of Course returned by API
 */
export interface CourseViewDto {
	uuid: string;
	order: number;
	phonemes: PhonemeViewDto[];
	color: string;
	script?: boolean;
	lesson?: boolean;
	exercice?: boolean;
	poster?: boolean;
	posterNames?: string[];
	sounds?: string[];
	words?: string[];
	[key: string]: any;
}
