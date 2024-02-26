import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http';
import {tap} from 'rxjs';

@Injectable()
export class NewsletterService extends HttpResource {
	protected override resource = 'newsletter';

	sendNews = (dto: any) =>
		this.post<{message: string}>(dto).pipe(
			tap(res => res.value && this.notifier.success(res.value.message))
		);
}
