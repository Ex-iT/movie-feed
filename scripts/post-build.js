#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

files = [
	path.join('build','service-worker.js')
]

files.forEach(file => {
	fs.unlink(file, error => {
		if (error) {
			console.log(`[-] Unable to remove ${file}`);
		} else {
			console.log(`[+] Removed ${file}`);
		}
	});
});
