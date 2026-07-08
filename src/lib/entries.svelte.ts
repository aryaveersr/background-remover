import { createContext } from 'svelte';
import { destroyEntry, downloadEntry, uploadEntry, type Entry } from './entry';

export class Entries {
	public all = $state<Entry[]>([]);

	add = (entry: Entry) => this.all.push(entry);
	isEmpty = () => this.all.length == 0;
	downloadAll = () => this.all.filter((entry) => entry.kind == 'processed').forEach(downloadEntry);

	uploadPending() {
		this.all.filter((entry) => entry.kind == 'pending').forEach(uploadEntry);
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
