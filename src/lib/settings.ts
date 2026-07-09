import { createContext } from 'svelte';

export class Settings {
	get autoDownload() {
		return localStorage.getItem('settings.autoDownload') == 'true';
	}

	set autoDownload(value: boolean) {
		localStorage.setItem('settings.autoDownload', value.toString());
	}
}

export const [getSettings, setSettings] = createContext<Settings>();
