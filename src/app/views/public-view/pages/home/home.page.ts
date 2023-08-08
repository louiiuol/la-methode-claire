import {NgFor} from '@angular/common';
import {Component, HostBinding, forwardRef} from '@angular/core';
import {TranslateModule} from '@core';
import {ButtonComponent, CardComponent} from '@shared/components';

@Component({
	standalone: true,
	imports: [
		NgFor,
		forwardRef(() => TranslateModule),
		CardComponent,
		ButtonComponent,
	],
	templateUrl: 'home.page.html',
})
export class HomePage {
	@HostBinding('class')
	protected readonly class = '!block bg-yellow-light mat-elevation-z4';

	protected readonly methodExplanations = [
		{
			index: 1,
			color: '#ac981a',
			title: 'scripts',
		},
		{
			index: 2,
			color: '#fdeaa6',
			title: 'lesson',
		},
		{
			index: 3,
			color: '#b2ced8',
			title: 'exercice',
		},
		{
			index: 4,
			color: '#ef7e64',
			title: 'poster',
		},
		{
			index: 5,
			color: '#ef7f96',
			title: 'newsletter',
		},
	];
}
