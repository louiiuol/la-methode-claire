import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * Formats given url and makes it "safe" using DomSanitizer
 *
 * This pipe must be used with controlled content only
 * (should be parsed and escaped to prevent XSS attacks)
 *
 * @author louiiuol
 */
@Pipe({
	standalone: true,
	name: 'trustURL',
})
export class TrustUrlPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}
	transform(value: string | null | undefined): SafeHtml {
		return this._sanitizer.bypassSecurityTrustResourceUrl(value ?? '');
	}
}
