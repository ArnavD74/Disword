// RunKit platform requires package name from NPM registry.
// Will not work on local machine, unless you have package installed globally.
const randomTextMeme = require("random-text-meme");

// One Random Emoji.
console.log(`Random emoji: ${randomTextMeme.getEmoji()}`);

// One Random Emoji from specified theme.
console.log(`Random Shrug emoji: ${randomTextMeme.getEmoji('shrug')}`);

// All Emoji we have in dictionary.
console.log(`All emoji: ${randomTextMeme.getAllEmoji()}`);

// All Emoji from specified theme.
console.log(`All cat emoji: ${randomTextMeme.getAllEmoji('cat')}`);

// List of themes
console.log(`All emoji themes: ${randomTextMeme.getThemes()}`);
