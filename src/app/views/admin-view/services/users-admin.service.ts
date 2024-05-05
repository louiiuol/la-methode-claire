import {Injectable} from '@angular/core';
import {PaginationFilters} from '@core/helpers/types/pagination-filters';
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

	getUsers = (params: PaginationFilters) =>
		this.getAllPaginated<UserPreviewDto>({
			notifyOnSuccess: false,
			path: 'users',
			params,
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
			path: 'export-emails',
		});
}
