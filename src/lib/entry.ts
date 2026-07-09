import { Settings } from './settings';

export interface BaseEntry {
	id: number;
	file: File;
	src: string;
}

export interface PendingEntry extends BaseEntry {
	kind: 'pending';
}

export interface ProcessingEntry extends BaseEntry {
	kind: 'processing';
	progress: number;
}

export interface ProcessedEntry extends BaseEntry {
	kind: 'processed';
	out: string;
}

export type Entry = PendingEntry | ProcessingEntry | ProcessedEntry;

let idCounter = 0;

export function createEntry(file: File): PendingEntry {
	return {
		id: idCounter++,
		file: file,
		src: URL.createObjectURL(file),
		kind: 'pending'
	};
}

export function destroyEntry(entry: Entry) {
	URL.revokeObjectURL(entry.src);
	if (entry.kind == 'processed') {
		URL.revokeObjectURL(entry.out);
	}
}

export function uploadEntry(pendingEntry: PendingEntry, settings: Settings) {
	const entry = pendingEntry as Entry;
	const xhr = new XMLHttpRequest();
	const form = new FormData();

	form.set('file', entry.file);

	(entry as ProcessingEntry).kind = 'processing';
	(entry as ProcessingEntry).progress = 0;

	xhr.upload.addEventListener('progress', (ev) => {
		if (ev.lengthComputable && (entry as ProcessingEntry).kind == 'processing') {
			(entry as ProcessingEntry).progress = Math.round((ev.loaded / ev.total) * 100);
		}
	});

	xhr.addEventListener('load', () => {
		(entry as ProcessedEntry).kind = 'processed';
		(entry as ProcessedEntry).out = URL.createObjectURL(xhr.response);

		if (settings.autoDownload) downloadEntry(entry as ProcessedEntry);
	});

	xhr.responseType = 'blob';
	xhr.open('POST', '/api/process');
	xhr.send(form);
}

export function downloadEntry(entry: ProcessedEntry) {
	const a = document.createElement('a');
	a.download = `${entry.file.name.split('.').slice(0, -1).join('.')}-no-bg.png`;
	a.href = entry.out;
	a.click();
}
