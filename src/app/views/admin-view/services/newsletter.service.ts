import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http';

@Injectable()
export class NewsletterService extends HttpResource {
	protected override resource = 'newsletter';

	sendNews = (dto: any) => this.create(dto);
}
