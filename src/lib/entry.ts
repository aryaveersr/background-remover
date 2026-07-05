export interface BaseEntry {
	id: number;
	kind: 'base';
	file: File;
	src: string;
}

export type ProcessingEntry = {
	kind: 'processing';
	progress: number;
} & Omit<BaseEntry, 'kind'>;

export type ProcessedEntry = {
	kind: 'processed';
	out: string;
} & Omit<BaseEntry, 'kind'>;

export type Entry = BaseEntry | ProcessingEntry | ProcessedEntry;

let idCounter = 0;

export function createEntry(file: File): BaseEntry {
	return {
		id: idCounter++,
		file: file,
		src: URL.createObjectURL(file),
		kind: 'base'
	};
}

export function downloadEntry(entry: ProcessedEntry) {
	const a = document.createElement('a');
	a.download = `${entry.file.name.split('.').slice(0, -1).join('.')}-no-bg.png`;
	a.href = entry.out;
	a.click();
}

export function destroyEntry(entry: Entry) {
	URL.revokeObjectURL(entry.src);
	if (entry.kind == 'processed') {
		URL.revokeObjectURL(entry.out);
	}
}

export function uploadEntry(entry: Entry) {
	if (entry.kind != 'base') return;

	const xhr = new XMLHttpRequest();
	const form = new FormData();

	form.set('file', entry.file);
	entry = {
		...entry,
		kind: 'processing',
		progress: 0
	} satisfies ProcessingEntry;

	xhr.upload.addEventListener('progress', (ev) => {
		if (ev.lengthComputable && entry.kind == 'processing') {
			entry.progress = Math.round((ev.loaded / ev.total) * 100);
		}
	});

	xhr.addEventListener('load', () => {
		entry = {
			...entry,
			kind: 'processed',
			out: URL.createObjectURL(xhr.response)
		} satisfies ProcessedEntry;
	});

	xhr.responseType = 'blob';
	xhr.open('POST', '/api/process');
	xhr.send(form);
}
