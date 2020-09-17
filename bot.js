//Designed by the Tangerine team, https://discord.gg/uwcgjYw or alt#0001
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./auth.json");
const ms = require("ms");
const fetch = require('node-fetch');

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

client.on("ready", () => {
  console.log(`Wordbot is online, with ${thousands_separators(client.users.size)} users, in ${thousands_separators(client.channels.size)} channels of ${thousands_separators(client.guilds.size)} servers.`);
  client.user.setActivity(`ethan on twitch.`, {
    type: 'WATCHING' //PLAYING, LISTENING, WATCHING
  });
  client.user.setStatus('online'); //online, idle, invisible, dnd
});

client.on("guildCreate", guild => {
  let channel = client.channels.get(
    guild.channels
    .filter(
      c =>
      c.permissionsFor(client.user).has("SEND_MESSAGES") &&
      c.type === "text"
    )
    .map(r => r.id)[0]
  );
});

client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.channel.type === "dm") {
    return message.reply("Sorry, Tangerine does not work in DMs.");
  }
  //////////////////////////////////////////////////////
  if (command === "ping") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Network Latency: ${m.createdTimestamp - message.createdTimestamp}ms. API Latency: ${Math.round(client.ping)}ms`);
  }
  //////////////////////////////////////////////////////






  
});

client.login(config.token);