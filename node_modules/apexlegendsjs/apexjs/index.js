const apexAPIURL = "public-api.tracker.gg"
const https = require('https');


class apexjs {
    constructor(code) {
        this.apiKey = code
    }
    getPlayer(username, platform) {
        checkInput([
            {name:"Username", type: "string" , value:username }, 
            {name:"Platform", type: "string" , value:platform}
        ])
        return new Promise( (resolve, reject) => {
          connectToAPI(username,platform, this.apiKey, (body, err)=>{
            if(err) reject("Player not found")
            let data = body.data
            let character = {};
            character.level = data.metadata.level
            character.legend_name = data.children[0].metadata.legend_name
            character.platformUserHandle = data.metadata.platformUserHandle
            resolve(character)
          })
        })
    }
    getDetailedPlayer(username, platform) {
        checkInput([
            {name:"Username", type: "string" , value:username }, 
            {name:"Platform", type: "string" , value:platform}
        ])
        return new Promise((resolve, reject) => {
            connectToAPI(username,platform, this.apiKey, (body, err)=>{
                if(err) reject("Player not found")
                let data = body.data;
                resolve(data)
            })
        })
    }
}
function getURL(username, platform) {
    if (platform == "PC") {
        return "/apex/v1/standard/profile/" + "5/" + username
    }
    else if (platform == "XBOX") {
        return "/apex/v1/standard/profile/"  + "1/" + username
    }
    else if (platform == "PSN") {
        return "/apex/v1/standard/profile/"  + "2/" + username
    }
    else {
        throw Error("Platform must be PC, XBOX, or PSN")
    }
}
function connectToAPI(username,platform, apiKey, callback){
    let url = getURL(username, platform)

    const options = {
        host: apexAPIURL,
        port: 443,
        method: 'GET',
        path: url,
        headers: {
            'Content-Type': 'application/json',
            'TRN-Api-Key': apiKey,
        }
    }
    const req = https.request(options, (res) => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', ()=>{
            body = JSON.parse(body)
            callback(body,null)});
    })
    req.on('error', (error) => {
        console.error(error)
        callback(null,error)
    })
    req.end()

}
function checkInput(inputs) {
    for(input of inputs){
        if(typeof input.value !== input.type) throw TypeError(input.name + " must be a " + input.type)
    }
}
module.exports = apexjs;