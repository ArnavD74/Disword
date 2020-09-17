# mojangjs
A lightweight, simple way to get UUIDs of usernames.
## Usage
Of course after running `npm install mojangjs` the methods are simple.  
All methods use Promise style callbacks as they are preferred.
## Methods
#### `getUUID(uuid)` - Gets the UUID of the player.
```js  
mojangjs.getUUID('Thorin').then(uuid => {
    console.log(uuid);
}).catch(err => console.error(err));
```
#### `nameHistory.byName(playername)` - Gets the name history of a player.
```js
mojangjs.nameHistory.byName('Thorin').then(nameHistory => {
	console.log(nameHistory);
}).catch(err => console.error(err));
```
#### `nameHistory.byUUID(uuid)` - Gets the name history of a UUID.
```js
mojangjs.nameHistory.byUUID('5de3d1d51a954fb3a2b788e4938ae11c').then(nameHistory => {
	console.log(nameHistory);
}).catch(err => console.error(err));
```
#### `statusCheck()` - Gets the current status from Mojang.
```js
mojangjs.statusCheck().then(status => {
	console.log(status);
}).catch(err => console.error(err));
```
#### `getNameFromUUID(uuid)` - Gets the current playername from a UUID.
```js
mojangjs.getNameFromUUID(uuid).then(name => {
	console.log(name);
}).catch(err => console.error(err));
```
