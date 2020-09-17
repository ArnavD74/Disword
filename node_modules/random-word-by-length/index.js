'use strict';
var words = require('word-list-json');
var uniqueRandom = require('unique-random');
var uniqueRandoms = {
  full: uniqueRandom(0, words.length - 1)
};
var maxLen = 0;
Object.keys(words.lengths).forEach(function (len) {
  if (Number(len) > maxLen) {
    maxLen = len;
  }
  uniqueRandoms[len] = uniqueRandom(0, words.lengths[len] - 1);
});
function randomWord(len) {
  if (typeof len !== 'number' || len < 2 || len !== len || len > maxLen) {
    len = 'full';
  }
  while (!(len in uniqueRandoms)) {
    len--;
  }
  
  return words[uniqueRandoms[len]()];
}
randomWord.maxLen = maxLen;
randomWord.uniqueRandoms = uniqueRandoms;
module.exports = randomWord;