# make-words

generate random words ![Node.js Package](https://github.com/dovid-moshe-crow/make-words/workflows/Node.js%20Package/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6dabcb1a2a854b9794e9abadc9e8793b)](https://app.codacy.com/manual/dovidmoshecrow/make-words?utm_source=github.com&utm_medium=referral&utm_content=dovid-moshe-crow/make-words&utm_campaign=Badge_Grade_Dashboard)
[![npm version](https://badge.fury.io/js/make-words.svg)](//npmjs.com/package/make-words)

## Installation

Use the package manager [npm](https://www.npmjs.com/package/make-words) to install make-words.

```bash
npm i make-words
```

## Functions

<dl>
<dt><a href="#getWordByLength">getWordByLength(length)</a> ⇒ <code>string</code></dt>
<dd><p>get all words thet have a specific length</p>
</dd>
<dt><a href="#getRandomWord">getRandomWord()</a> ⇒ <code>string</code></dt>
<dd><p>get a random word from the dataset</p>
</dd>
<dt><a href="#getWord">getWord(length, letters, excludeChars, [mustHaveLetter])</a></dt>
<dd><p>get a word that has a specific length and that includes the most letters possible from the letters array</p>
</dd>
<dt><a href="#getWords">getWords(count, minWordLength, maxWordLength, letters, excludeChars, [mustHaveLetter])</a></dt>
<dd><p>get any number of random words that contain specific letters</p>
</dd>
</dl>

<a name="getWordByLength"></a>

## getWordByLength(length) ⇒ <code>string</code>

get all words thet have a specific length

**Kind**: global function

| Param  | Type                |
| ------ | ------------------- |
| length | <code>number</code> |

<a name="getRandomWord"></a>

## getRandomWord() ⇒ <code>string</code>

get a random word from the dataset

**Kind**: global function  
<a name="getWord"></a>

## getWord(length, letters, excludeChars, \[mustHaveLetter\])

get a word that has a specific length and that includes the most letters possible from the letters array

**Kind**: global function

| Param              | Type                              |
| ------------------ | --------------------------------- |
| length             | <code>number</code>               |
| letters            | <code>Array.&lt;string&gt;</code> |
| excludeChars       | <code>Array.&lt;string&gt;</code> |
| \[mustHaveLetter\] | <code>string</code>               |

<a name="getWords"></a>

## getWords(count, minWordLength, maxWordLength, letters, excludeChars, \[mustHaveLetter\])

get any number of random words that contain specific letters

**Kind**: global function

| Param              | Type                              |
| ------------------ | --------------------------------- |
| count              | <code>number</code>               |
| minWordLength      | <code>number</code>               |
| maxWordLength      | <code>number</code>               |
| letters            | <code>Array.&lt;string&gt;</code> |
| excludeChars       | <code>Array.&lt;string&gt;</code> |
| \[mustHaveLetter\] | <code>string</code>               |

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
