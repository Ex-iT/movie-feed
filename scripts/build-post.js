#!/usr/bin/env node
const del = require('del');
const path = require('path');

(async () => {
	const deletedPaths = await del([path.join('build', 'service-worker.js')]);
	console.log(`[+] Removed ${deletedPaths.join(',')}`);
})();
