export class Entry {
	id: number;
	file: File;
	status: 'new' | 'uploading' | 'processing' | 'success';

	src: string;
	progress: number;

	static idCounter = 0;

	constructor(file: File) {
		this.id = Entry.idCounter++;
		this.file = file;
		this.status = $state('new');
		this.src = $state('');
		this.progress = $state(0);
	}

	onSuccess(blob: Blob) {
		this.status = 'success';
		this.src = URL.createObjectURL(blob);
	}

	download() {
		if (!this.src) throw new Error('download() called on unresolved entry');

		const a = document.createElement('a');
		a.download = `${this.file.name.split('.').slice(0, -1).join('.')}-no-bg.png`;
		a.href = this.src;
		a.click();
	}
}
