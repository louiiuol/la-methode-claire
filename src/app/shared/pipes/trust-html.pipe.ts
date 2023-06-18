import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * Formats given html content and makes it "safe" using DomSanitizer
 *
 * This pipe must be used with controlled content only (should be parsed and escaped)
 */
@Pipe({
	standalone: true,
	name: 'trustHtml',
})
export class TrustHtmlPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}
	transform(value: string | null | undefined): SafeHtml {
		return this._sanitizer.bypassSecurityTrustHtml(value ?? '');
	}
}
