export type Status = 'unprocessed' | 'processing' | 'processed';

export class Entry {
	id: number;
	file: File;
	status: Status;

	srcIn: string;
	srcOut: string;
	progress: number;

	static idCounter = 0;

	constructor(file: File) {
		this.id = Entry.idCounter++;
		this.file = file;
		this.srcIn = URL.createObjectURL(file);
		this.srcOut = '';

		this.status = $state('unprocessed');
		this.progress = $state(0);
	}

	static async fromUrl(url: string) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const filename = new URL(url).pathname.split('/').pop() || 'Undefined';
		const blob = await fetch(url).then((res) => res.blob());
		const file = new File([blob], filename, {
			type: blob.type
		});

		return new Entry(file);
	}

	upload() {
		const xhr = new XMLHttpRequest();
		const form = new FormData();

		form.set('file', this.file);
		this.status = 'processing';

		xhr.upload.addEventListener('progress', (ev) => {
			if (ev.lengthComputable && this.status == 'processing') {
				this.progress = Math.round((ev.loaded / ev.total) * 100);
			}
		});

		xhr.addEventListener('load', () => {
			this.status = 'processed';
			this.srcOut = URL.createObjectURL(xhr.response);
		});

		xhr.responseType = 'blob';
		xhr.open('POST', '/');
		xhr.send(form);
	}

	download() {
		if (!this.srcOut) throw new Error('download() called on unresolved entry');

		const a = document.createElement('a');
		a.download = `${this.file.name.split('.').slice(0, -1).join('.')}-no-bg.png`;
		a.href = this.srcOut;
		a.click();
	}
}
