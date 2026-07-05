import { createContext } from 'svelte';

export type UnprocessedEntry = Entry & { state: { status: 'unprocessed' } };
export type ProcessingEntry = Entry & { state: { status: 'processing' } };
export type ProcessedEntry = Entry & { state: { status: 'processed' } };

export class Entry {
	static idCounter = 0;

	public id: number;
	public file: File;
	public src: string;
	public state:
		| { status: 'unprocessed' }
		| { status: 'processing'; progress: number }
		| { status: 'processed'; out: string };

	constructor(file: File) {
		this.id = Entry.idCounter++;
		this.file = file;
		this.src = URL.createObjectURL(file);
		this.state = $state({ status: 'unprocessed' });
	}

	destroy() {
		URL.revokeObjectURL(this.src);
		if (this.state.status == 'processed') {
			URL.revokeObjectURL(this.state.out);
		}
	}

	isUnprocessed = (): this is UnprocessedEntry => this.state.status == 'unprocessed';
	isProcessing = (): this is ProcessingEntry => this.state.status == 'processing';
	isProcessed = (): this is ProcessedEntry => this.state.status == 'processed';

	upload() {
		if (this.state.status != 'unprocessed') return;

		const xhr = new XMLHttpRequest();
		const form = new FormData();

		form.set('file', this.file);
		this.state = {
			status: 'processing',
			progress: 0
		};

		xhr.upload.addEventListener('progress', (ev) => {
			if (ev.lengthComputable && this.state.status == 'processing') {
				this.state.progress = Math.round((ev.loaded / ev.total) * 100);
			}
		});

		xhr.addEventListener('load', () => {
			this.state = {
				status: 'processed',
				out: URL.createObjectURL(xhr.response)
			};
		});

		xhr.responseType = 'blob';
		xhr.open('POST', '/api/process');
		xhr.send(form);
	}

	download(this: ProcessedEntry) {
		const a = document.createElement('a');

		a.download = `${this.file.name.split('.').slice(0, -1).join('.')}-no-bg.png`;
		a.href = this.state.out;
		a.click();
	}
}

export class Entries {
	public all = $state<Entry[]>([]);
	public notProcessed = $derived(this.all.filter((entry) => !entry.isProcessed()));
	public processed = $derived(this.all.filter((entry) => entry.isProcessed()));

	add = (entry: Entry) => this.all.push(entry);
	isEmpty = () => this.all.length == 0;
	downloadAll = () => this.processed.forEach((entry) => entry.download());

	upload() {
		this.all.filter((entry) => entry.isUnprocessed()).forEach((entry) => entry.upload());
	}

	clearAll() {
		this.all.forEach((entry) => entry.destroy());
		this.all = [];
	}

	clearUnprocessed() {
		this.all.filter((entry) => entry.isUnprocessed()).forEach((entry) => entry.destroy());
		this.all = this.all.filter((entry) => !entry.isUnprocessed());
	}

	clearProcessed() {
		this.all.filter((entry) => entry.isProcessed()).forEach((entry) => entry.destroy());
		this.all = this.all.filter((entry) => !entry.isProcessed());
	}

	remove(entry: Entry) {
		const index = this.all.indexOf(entry);
		this.all.splice(index, 1);
		entry.destroy();
	}
}

export const [getEntries, setEntries] = createContext<Entries>();
