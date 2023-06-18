import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {CardComponent} from '@shared/components';
import {ContactForm} from '@shared/components/features/contact/contact.component';

@Component({
	standalone: true,
	imports: [CardComponent, ContactForm],
	template: ` <app-contact-form />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
	@HostBinding('class')
	protected readonly class = 'centered-content p-4';
}
