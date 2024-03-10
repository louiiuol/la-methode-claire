import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'since', standalone: true})
export class SincePipe implements PipeTransform {
	intervals: {[key: string]: number} = {
		année: 31_536_000,
		mois: 2_592_000,
		semaine: 604_800,
		jour: 86_400,
		heure: 3_600,
		minute: 60,
		seconde: 1,
	};
	transform(value: any): string {
		if (value) {
			const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
			if (seconds < 29) return "À l'instant";
			let counter;
			for (const i in this.intervals) {
				counter = Math.floor(seconds / this.intervals[i]);
				if (counter > 0) {
					const suffix = counter > 1 && i != 'mois' ? 's' : '';
					return `Il y a ${counter} ${i + suffix}`;
				}
			}
		}
		return 'Jamais';
	}
}
