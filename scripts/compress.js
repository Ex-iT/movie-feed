#!/usr/bin/env node
const fs = require('fs');
const read = require('fs-readdir-recursive');
const zlib = require('zlib');

const basePath = './build';
const match = /\.(js|css)$/;
const files = read(basePath).filter(file => file.match(match));

if (files.length) {
	console.log(`[=] Compressing files...`);

	files.forEach(file => {
		const filePath = `${basePath}/${file}`;
		fs.readFile(filePath, (error, fileRead) => {
			if (error) {
				console.log(`[-] Error reading ${filePath}`);
			} else {
				const sizeBefore = fileRead.length;
				zlib.brotliCompress(fileRead, {
					params: {
						[zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
						[zlib.constants.BROTLI_PARAM_SIZE_HINT]: sizeBefore
					}
				}, (error, compressedData) => {
					if (error) {
						console.log(`[!] Failed to compress ${file}`);
					} else {
						const extension = 'br';
						const compressedFile = `${basePath}/${file}.${extension}`;
						const sizeAfter = compressedData.length;
						const percentage = Math.round((((sizeBefore - sizeAfter) / sizeBefore) * 100 + Number.EPSILON) * 100) / 100;

						if (sizeAfter >= sizeBefore) {
							console.log(`[-] Skipping ${filePath}`);
						} else {
							fs.writeFile(compressedFile, compressedData, error => {
								if (error) {
									console.log(`[-] Error writing file ${filePath}`);
								} else {
									console.log(`[+] Compressed ${filePath} -> ${percentage}%`);
								}
							});
						}
					}
				});
			}
		});
	});
}
