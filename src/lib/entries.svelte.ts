import { createContext } from 'svelte';
import { destroyEntry, downloadEntry, uploadEntry, type Entry } from './entry';
import type { Settings } from './settings';

export class Entries {
	public all = $state<Entry[]>([]);
	private settings: Settings;

	constructor(settings: Settings) {
		this.settings = settings;
	}

	add = (entry: Entry) => this.all.push(entry);
	isEmpty = () => this.all.length == 0;

	downloadProcessed() {
		this.all.filter((entry) => entry.kind == 'processed').forEach(downloadEntry);
	}

	uploadPending() {
		this.all
			.filter((entry) => entry.kind == 'pending')
			.forEach((entry) => uploadEntry(entry, this.settings));
	}

	clearAll() {
		this.all.forEach(destroyEntry);
		this.all = [];
	}

	clearPending() {
		this.all.filter((entry) => entry.kind == 'pending').forEach(destroyEntry);
		this.all = this.all.filter((entry) => entry.kind != 'pending');
	}

	clearProcessed() {
		this.all.filter((entry) => entry.kind == 'processed').forEach(destroyEntry);
		this.all = this.all.filter((entry) => entry.kind != 'processed');
	}

	remove(entry: Entry) {
		const index = this.all.indexOf(entry);
		this.all.splice(index, 1);
		destroyEntry(entry);
	}
}

export const [getEntries, setEntries] = createContext<Entries>();
