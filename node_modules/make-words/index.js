"use strict";

const { words, letters, otherChars } = require("./hebrew");

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @private
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * shuffle all elements in the array
 * @private
 * @param {string[]} arr
 * @returns {string[]}
 */
function shuffleLetters(arr) {
  if (arr.length < 2) {
    return arr;
  }

  for (let i = arr.length - 1; i > 0; --i) {
    const j = 1 + Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/**
 * get the longest word in the dataset
 * @private
 * @param {string[]} words
 * @returns {number}
 */
function getLongestWordLength(words) {
  return words.sort((a, b) => b.length - a.length)[0].length;
}

/**
 * check that the length of the word exists in the dataset
 * @private
 * @param {nubmer} length
 * @param {string[]} words
 * @returns {void | Error}
 */
function checkLength(length, words) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("length cant be less or equel to zero");
  } else {
    const longestWordLength = getLongestWordLength(words);
    if (length > longestWordLength) {
      throw new Error(`length cant be bigger then ${longestWordLength}`);
    }
  }
}

/**
 * filter words that contain specific charecters
 * @private
 * @param {string[]} words
 * @param {string[]} excludeChars
 * @returns {string[]}
 */
function excludeCharsFromWords(words, excludeChars = []) {
  if (excludeChars == undefined) {
    return words;
  }
  return words.filter((x) => ![...x].some((r) => excludeChars.includes(r)));
}

/**
 * filter words that don't contain specific letters
 * @private
 * @param {string[]} words
 * @param {string[]} letters
 * @returns {string[]}
 */
function filterWordsByLetters(words, letters) {
  return words.filter((x) => [...x].every((r) => letters.includes(r)));
}

/**
 * get a random word from the dataset
 * @private
 * @param {string[]} words
 * @returns {string}
 */
function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * filter the words by length
 * @private
 * @param {string[]} words
 * @param {number} length
 * @returns {string[]}
 */
function filterWordsByLength(words, length) {
  return words.filter((x) => x.length === length);
}

/**
 * get all words thet have a specific length
 * @param {number} length
 * @returns {string}
 */
exports.getWordByLength = function (length) {
  checkLength(length, words);
  return getRandomWord(filterWordsByLength(words, length));
};

/**
 * get a random word from the dataset
 * @returns {string}
 */
exports.getRandomWord = function () {
  return getRandomWord(words);
};

/**
 * get a word that has a specific length and that includes the most letters possible from the letters array
 * @param {number} length
 * @param {string[]} letters
 * @param {string[]} excludeChars
 * @param {string} [mustHaveLetter]
 */
exports.getWord = function (length, letters, excludeChars, mustHaveLetter) {
  checkLength(length, words);
  letters = shuffleLetters(letters);

  let filteredWords = excludeCharsFromWords(words, excludeChars);

  if (mustHaveLetter != undefined) {
    filteredWords = filteredWords.filter((word) =>
      word.includes(mustHaveLetter)
    );
  }

  filteredWords = filterWordsByLetters(filteredWords, letters);

  let filteredWordsByLength = filterWordsByLength(filteredWords, length);

  if (filteredWordsByLength != undefined && filteredWordsByLength.length > 0) {
    return getRandomWord(filteredWordsByLength);
  }

  return getRandomWord(filteredWords);
};

/**
 * get any number of random words that contain specific letters
 * @param {number} count
 * @param {number} minWordLength
 * @param {number} maxWordLength
 * @param {string[]} letters
 * @param {string[]} excludeChars
 * @param {string} [mustHaveLetter]
 * @returns {string[]}
 */
exports.getWords = function (
  count,
  minWordLength,
  maxWordLength,
  letters,
  excludeChars,
  mustHaveLetter
) {
  let practiceWords = [];
  for (let i = 0; i < count; i++) {
    practiceWords.push(
      exports.getWord(
        getRandomInt(minWordLength, maxWordLength),
        letters,
        excludeChars,
        mustHaveLetter
      )
    );
  }

  return practiceWords;
};

exports.otherChars = otherChars;
exports.letters = letters;
