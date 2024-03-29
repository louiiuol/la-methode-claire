import {Injectable} from '@angular/core';
import {nullish} from '@core';
import {HttpResource} from '@core/modules/http/services/http.resource';
import {UserPreviewDto} from '@shared/modules';

/**
 * CRUD requests related to users. (For Admin only)
 *
 * @author louiiuol
 */
@Injectable()
export class UsersAdminService extends HttpResource {
	protected resource = 'admin';

	getUsers = (
		sort: string,
		direction: string,
		page: number,
		size: number,
		filter: string | number | boolean | string[] | number[] | nullish
	) =>
		this.getAllPaginated<UserPreviewDto>({
			notifyOnSuccess: false,
			path: 'users',
			params: {
				sort: `${sort}:${direction}`,
				direction,
				page,
				size,
				filter,
			},
		});

	toggleActivation = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(
			user.uuid,
			{isActive: !user.isActive},
			{path: 'users'}
		);

	toggleSubscription = (user: UserPreviewDto) =>
		this.partialUpdate<UserPreviewDto>(
			user.uuid,
			{
				subscribed: !user.subscribed,
			},
			{path: 'users'}
		);

	resetSubscriptions = () =>
		this.get(null, {
			customResource: '',
			path: 'reset-subscription',
			customAction: 'update',
		});

	exportEmails = () =>
		this.get<{emails: string}>(null, {
			customResource: '',
			path: 'export-emails',
		});
}
