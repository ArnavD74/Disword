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
  if (command === "start") {
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

    message.reply("Please enter a 5-letter word, e.g. hello");

    finalArr = finalWord.split("");
    var attempt = "";
    var wordResponse = "";
    var turns = 1;

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      time: 120000
    });

    collector.on('collect', m => {
      console.log(`captured ${m.content}`);
      attempt = `${m.content}`;

      if ((words.check(attempt)))
        console.log("Is english.");
      else
        message.reply("That is not an English word!")
      if (attempt.length === 5)
        console.log("Is five letters.");
      else
        message.reply("Please make sure your word is 5 letters!");
        
      if (words.check(attempt) && attempt.length === 5) {
        if (attempt == finalWord)
          return message.reply(`You win!!!`);
        if (turns === 7)
          message.reply(`You are out of turns! The word was: ${finalword}`)
        turns++;
        wordResponse = "";
        for (var i = 0; i < 5; i++) {
          if (finalWord.charAt(i) === attempt.charAt(i)) {
            wordResponse += (`\nLetter ${i+1} is correct! `)
          } else if (finalWord.includes(attempt.charAt(i))) {
            wordResponse += (`\nLetter ${i+1} is almost correct! `)
          }
        }
        message.reply(`Turn: ${turns}\n${wordResponse}`);
      }
    });

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
      message.reply(`Time's Up! The word was: ${finalword}`);
    });












  }
});

client.login(config.token);