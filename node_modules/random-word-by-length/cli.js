#!/usr/bin/env node
'use strict';
var randomWord = require('./index');

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	console.log('Usage:\n  $ random-word [-l maxLength]\n  ferriferous');
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(require('./package').version);
	return;
}
var i;
if (process.argv.indexOf('-l') !== -1) {
  i = process.argv.indexOf('-l');
} else if(process.argv.indexOf('--length') !== -1) {
  i = process.argv.indexOf('--length');
}
if (i) {
  console.log(randomWord(Number(process.argv[i + 1])));
  return;
}

console.log(randomWord());
