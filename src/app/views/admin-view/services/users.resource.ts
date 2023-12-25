import {Injectable} from '@angular/core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {UserPreviewDto} from '@shared/modules';

/**
 * CRUD requests related to users.
 *
 * @author louiiuol
 */
@Injectable()
export class UsersResource extends HttpResource {
	protected resource = 'users';

	getUsers = (active: string, direction: string, page: number) =>
		this.getAll<UserPreviewDto>({
			notifyOnSuccess: false,
			params: {active, direction, page: page + 1},
		});

	toggleActivation = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(user.uuid, {isActive: !user.isActive});

	toggleSubscription = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(user.uuid, {
			subscribed: !user.subscribed,
		});
}
