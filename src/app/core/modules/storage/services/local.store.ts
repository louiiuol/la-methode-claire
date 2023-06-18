import {Injectable} from '@angular/core';

@Injectable()
export class LocalStore {
	set = (key: string, value: any) => {
		const toStore = typeof value === 'string' ? value : JSON.stringify(value);
		localStorage.setItem(key, toStore);
	};

	get = (key: string) => localStorage.getItem(key) ?? '{}';

	check = (key: string) => !!localStorage.getItem(key);

	clear = (key: string) => localStorage.removeItem(key);

	clearAll = () => localStorage.clear();
}
