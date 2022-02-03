const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"]
})
const config = require("./auth.json");
const yawg = require('yawg');
const checkWord = require('check-if-word'),
  words = checkWord('en');


client.on("ready", () => {
  console.log(`Wordbot is online`);
  client.user.setActivity(`Wordle`, {
    type: 'WATCHING'
  });
  client.user.setStatus('online');
});
client.on("messageCreate", async message => {
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
  if (command === "word") {

    var finalword = "";

    try {
      finalWord = yawg({
        minWords: 1,
        maxWords: 1,
        minWordLength: 5,
        maxWordLength: 5,
        minLength: 5,
        maxLength: 5,
        count: 1
      });
      console.log(`Final word: ${finalWord}`);
    } catch (err) {
      console.log(err);
      message.reply("An error occured.");
    }

    finalArr = finalWord.split("");

    message.reply("Please enter a 5-letter word, e.g. hello");

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      time: 5000
    });

    var try1 = "";
    var isWord = false;
    var isFive = false;

    while (isFive === false && isWord === false) {
      
      collector.on('collect', m => {
        console.log(`captured ${m.content}`);
        try1 = m.content;
        if ((words.check(`{m.content}`))) {
          isWord = true;
          console.log("Is english.");
        } else {
          message.reply("That is not an English word!")
          console.log("Is not English.");
        }
        if (m.content.length == 5) {
          console.log("Is five letters.");
          isFive = true;
        } else {
          message.reply("Please make sure your word is 5 letters!");
          console.log("Is not five letters.");
        }
      });

    }

    var try1arr = try1.split("");
    for (var i = 0; i < 5; i++) {
      if (finalArr[i] === try1arr[i]) {
        message.reply(`Letter ${i+1} is correct!`)
      } else if (finalWord.includes(try1arr[i])) {
        message.reply(`Position ${i+1} is almost correct!`)
      }
    }



  }
});

client.login(config.token);