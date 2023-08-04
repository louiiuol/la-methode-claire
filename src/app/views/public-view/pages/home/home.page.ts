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
	@HostBinding('class') protected class = '!block';

	methodExplanations = [
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
			title: 'dashboard',
		},
		{
			index: 5,
			color: '#fcdac6',
			title: 'poster',
		},
		{
			index: 6,
			color: '#ef7f96',
			title: 'newsletter',
		},
	];
}
