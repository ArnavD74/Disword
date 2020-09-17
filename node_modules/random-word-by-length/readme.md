# random-word-by-length

> Returns a random English word from the [Letterpress Word List](https://github.com/atebits/Words/blob/master/Words/en.txt) with an opitonal max length.


## Install

```bash
$ npm install --save random-word-by-length
```


## Usage

```js
var randomWord = require('random-word-by-length');

randomWord();
//=> ferriferous

randomWord(6);
//=> boride
```


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global random-word-by-length
```

### Usage

```bash
$ random-word-by-length
ferriferous

$ random-word-by-length -l 5
goor
```


### Tip

Use it to generate project/release names:

```bash
$ echo $(random-word-by-length)-$(random-word-by-length)
blacksnake-nautics
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
