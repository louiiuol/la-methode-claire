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

	getUsers = (
		sort: string,
		direction: string,
		page: number,
		size: number,
		filter?: string | null
	) =>
		this.getAllPaginated<UserPreviewDto>({
			notifyOnSuccess: false,
			params: {
				sort: `${sort}:${direction}`,
				direction,
				page,
				size,
				filter,
			},
		});

	toggleActivation = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(user.uuid, {isActive: !user.isActive});

	toggleSubscription = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(user.uuid, {
			subscribed: !user.subscribed,
		});
}
