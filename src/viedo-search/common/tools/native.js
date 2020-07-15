export function toast(message) {
	// #ifdef APP-PLUS
	plus.nativeUI.toast(message);
	// #endif
}

export function download(url, opts) {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		const dtask = plus.downloader.createDownload(url, opts, (download, status) => {
			if (status === 200) {
				resolve(download);
			} else {
				reject(status);
			}
		});
		dtask.start();
		// #endif
		// #ifdef !APP-PLUS
		resolve({});
		// #endif
	});
}

export function installApp(d) {
	console.log(d)
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, resolve, reject)
		// #endif
		// #ifdef !APP-PLUS
		resolve({});
		// #endif
	});
}
