import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-contact-form',
	template: `<p>Coming soon ! 🥶</p>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
	@HostBinding('class')
	protected readonly class = 'w-full h-full';
}
