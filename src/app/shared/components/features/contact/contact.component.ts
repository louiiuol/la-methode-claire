import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-contact-form',
	template: `<iframe
		class="h-full w-full"
		frameBorder="0"
		src="https://share.hsforms.com/1VYDmOghLS0qBLzSVhjgoag2k2de"></iframe>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
	@HostBinding('class')
	protected readonly class = 'w-full h-full';
}
