[![Build Status](https://travis-ci.org/xcomanche/random-text-meme.svg?branch=master)](https://travis-ci.org/xcomanche/random-text-meme)
[![Coverage Status](https://coveralls.io/repos/github/xcomanche/random-text-meme/badge.svg?branch=master)](https://coveralls.io/github/xcomanche/random-text-meme?branch=master)
[![npm version](http://img.shields.io/npm/v/random-text-meme.svg?style=flat)](https://www.npmjs.com/package/random-text-meme "View this project on npm")
[![Maintainability](https://api.codeclimate.com/v1/badges/689675c1c6d30a3befe9/maintainability)](https://codeclimate.com/github/xcomanche/random-text-meme/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/689675c1c6d30a3befe9/test_coverage)](https://codeclimate.com/github/xcomanche/random-text-meme/test_coverage)
[![dependencies Status](https://david-dm.org/xcomanche/random-text-meme/status.svg)](https://david-dm.org/xcomanche/random-text-meme)
[![devDependencies Status](https://david-dm.org/xcomanche/random-text-meme/dev-status.svg)](https://david-dm.org/xcomanche/random-text-meme?type=dev)
[![bundle size](https://img.shields.io/bundlephobia/min/random-text-meme.svg)](https://bundlephobia.com/result?p=random-text-meme)
![](https://img.shields.io/npm/dt/random-text-meme.svg)
![](https://img.shields.io/github/issues/xcomanche/random-text-meme.svg)
![](https://img.shields.io/npm/l/random-text-meme.svg)
![](https://img.shields.io/github/last-commit/xcomanche/random-text-meme.svg)



# random-text-meme generator
Tired? we don't know how to help you! but we sure do have nice text emoji.
ヽ(°∀°人´ヮ´)ﾉ

Just look at those beautiful faces: ᶘಠᴥಠᶅ (´・(oo)・｀) ᕕ( ᐛ )ᕗ ( ͡° ͜ʖ ͡°) 乁(ツ)ㄏ (ᵔᴥᵔ)
### Demo
RunKit friendly demo!
https://npm.runkit.com/random-text-meme

## Usage
### Install
``npm i random-text-meme --save``
### Require
``const { getEmoji, getAllEmoji, getThemes } = require('random-text-meme');``
### Display emoji
* ``getEmoji('flip-table');`` => (╯°□°）╯︵ ┻━┻
* ``getEmoji();`` => ಠ_ಠ
* ``getThemes();`` => ['boo', 'bear', 'cat', 'dog', ...]
### Not Found
if for some reason dictionary not found, or emoji could not be found, default emoji: (╯°□°）╯︵ ᔭ0ᔭ would be returned.
### Test
``npm run test`` runs unit tests

## Api
* ``getEmoji`` - returns random emoji. theme name can be specified (than random emoji would be chosen from within a theme).
* ``getAllEmoji`` - returns all emoji.  theme name can be specified.
* ``getThemes`` - get list of all available themes.

# copyright
all emoji were found on the internet. Most copied from https://cutekaomoji.com website.
