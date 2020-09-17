# apexlegendsjs

![npm](https://img.shields.io/npm/dt/apexlegendsjs)

0 Dependency package that connects to an Apex Legends API

Go here to sign up for an API Key: https://apex.tracker.gg/site-api

Then paste your key into API_KEY_HERE

After that, use either the apex.getPlayer() or apex.getDetailedPlayer() functions

```
const Apex = require('apexlegendsjs')
const apex = new Apex("API_KEY_HERE")

//Returns basic core statistics about the player
apex.getPlayer("playerName","PC") //or XBOX or PSN
.then((response)=>{
    console.log(response)
})
.catch((err)=>{
    console.log(err)
})

//Returns more detailed information about the player
apex.getDetailedPlayer("playerName","PC") //or XBOX or PSN
.then((response)=>{
    console.log(response)
})
.catch((err)=>{
    console.log(err)
})
```

