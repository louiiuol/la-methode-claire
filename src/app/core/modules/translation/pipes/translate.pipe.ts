import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '../services/translate.service';

@Pipe({
	standalone: true,
	name: 'translate',
})
export class TranslatePipe implements PipeTransform {
	constructor(private translate: TranslateService) {}

	transform = (key: string, param?: {[param: string]: string}): string => {
		return this.translate.translate(param ? {key, param} : key);
	};
}
