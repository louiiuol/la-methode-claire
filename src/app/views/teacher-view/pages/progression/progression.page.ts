import {AsyncPipe, NgFor, NgIf, ViewportScroller} from '@angular/common';
import {
	AfterViewChecked,
	Component,
	ElementRef,
	HostBinding,
	OnInit,
	ViewChild,
	forwardRef,
	inject,
} from '@angular/core';

import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';

const MaterialModules = [MatBadgeModule, MatTooltipModule];

import {AuthService, TranslateModule} from '@core';
import {ButtonComponent} from '@shared/components';
import {LibraryModule} from '@shared/modules/library/library.module';
import {LibraryService} from '@shared/modules/library/services/library.service';

@Component({
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		NgFor,
		forwardRef(() => LibraryModule),
		forwardRef(() => TranslateModule),
		ButtonComponent,
		...MaterialModules,
	],
	templateUrl: './progression.page.html',
})
export class ProgressionPage {
	@HostBinding('class')
	protected readonly class = 'p-6';

	protected readonly lessons$ = inject(LibraryService).getLibrary();
	protected readonly hasValidSubscription =
		!!this.authenticator?.currentUser()?.hasValidSubscription;

	protected currentLesson =
		this.authenticator?.currentUser()?.currentLesson ?? 0;

	constructor(private readonly authenticator: AuthService) {}
}
