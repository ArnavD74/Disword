# wikipics-api [![Build Status](https://travis-ci.org/CodeDotJS/wikipics-api.svg?branch=master)](https://travis-ci.org/CodeDotJS/wikipics-api)

> A simple API to obtain Wikipedia Picture of the Day

## Install

```
$ npm install --save wikipics-api
```

## Usage

```js
'use strict'

const wikipics = require('wikipics-api');

wikipics().then(data => {
  console.log(data);
  /*
  {
    image: 'https://upload.wikimedia.org/.../20px-Padlock-pink.svg.png',
    name: '20px-Padlock-pink.svg.png',
    data: 'Centaurea jacea\nPhotograph: Uoaei1\nArchive – More featured pictures...'
  }
  */
});

wikipics('2014-10-10').then(data => {
  console.log(data);
  /*
  {
    image: 'https://upload.wikimedia.....450px-Soursop%2C_Annona_muricata.jpg',
    name: '450px-Soursop%2C_Annona_muricata.jpg',
    data: 'The soursop is the fruit of ...with sour citrus flavour...'
  }
  */
});
```

## API

#### `wikipics()`

- `Return promise for current picture of the day`

#### `wikipics('date')`

- `Returns promise for picture of the day of specific date`

`date`

`TYPE` `:` `string`

`FORMAT` `:` `yyyy-mm-dd`


## Related

- __[`wikipics`](https://github.com/CodeDotJS/wikipics)__ : `Download Wikipedia Picture of the Day and more!`

## License

MIT &copy; [Rishi Giri](http://rishigiri.ml)
