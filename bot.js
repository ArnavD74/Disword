const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"]
})
const config = require("./auth.json");
const yawg = require('yawg');
const checkWord = require('check-if-word'),
  words = checkWord('en');
const fs = require('fs');
const text2png = require('text2png');
const images = require("images");
const sizeOf = require('image-size')
var imgcache = 0;

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

    var user = message.author.id;
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
      console.log(`Final word for ${user}: ${finalWord}`);
    } catch (err) {
      console.log(err);
      message.reply("An error occured.");
    }

    var dict = []

    dict.push({
      id: message.author.id,
      word: finalWord
    });



    message.reply("Please enter a 5-letter word, e.g. hello");

    finalArr = finalWordUser[1].split("");
    var attempt = "";
    var wordResponse = "";
    var turns = 1;
    var finishedGame = false;
    var currentWord = "";

    var letters = ["gray", "gray", "gray", "gray", "gray"];

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      time: 120000
    });

    collector.on('collect', m => {
      console.log(`captured ${m.content}`);
      attempt = `${m.content}`;
      if (!(words.check(attempt)))
        message.reply("That is not an English word!")

      if (!(attempt.length === 5))
        message.reply("Please make sure your word is 5 letters!");

      if (words.check(attempt) && attempt.length === 5) {
        letters = ["gray", "gray", "gray", "gray", "gray"];
        imgcache++;
        if (attempt == finalWord) {
          message.reply(`You win! The word was: ${finalWord}`);
          finishedGame = true;
          m.time = 120000;
          return;
        }

        if (turns === 7)
          message.reply(`You are out of turns! The word was: ${finalWord}`)
        turns++;
        wordResponse = "";

        for (var i = 0; i < 5; i++) {
          currentWord[i] = attempt.charAt(i);
        }

        for (var i = 0; i < 5; i++) {
          if (finalWord.charAt(i) === attempt.charAt(i))
            letters[i] = "green";
          else if (finalWord.includes(attempt.charAt(i)))
            letters[i] = "yellow";
        }

        var attemptUpper = attempt.toUpperCase();

        fs.writeFileSync(`cache/${imgcache}.png`, text2png(`${attemptUpper.charAt(0)}`, {
          color: `${letters[0]}`
        }));
        fs.writeFileSync(`cache/${imgcache+1}.png`, text2png(`${attemptUpper.charAt(1)}`, {
          color: `${letters[1]}`
        }));
        fs.writeFileSync(`cache/${imgcache+2}.png`, text2png(`${attemptUpper.charAt(2)}`, {
          color: `${letters[2]}`
        }));
        fs.writeFileSync(`cache/${imgcache+3}.png`, text2png(`${attemptUpper.charAt(3)}`, {
          color: `${letters[3]}`
        }));
        fs.writeFileSync(`cache/${imgcache+4}.png`, text2png(`${attemptUpper.charAt(4)}`, {
          color: `${letters[4]}`
        }));

        var dimensions = [0, 0, 0, 0, 0];

        var imgX = 0;
        var imgY = 0;

        for (var i = 0; i < 5; i++) {
          dimensions[i] = sizeOf(`cache/${imgcache+i}.png`)
          imgY = dimensions[i].height;
          imgX += dimensions[i].width;
        }

        images(300, 60)
          .draw(images(`cache/${imgcache}.png`), dimensions[0].width, dimensions[0].height)
          .draw(images(`cache/${imgcache+1}.png`), dimensions[1].width + 30, dimensions[1].height)
          .draw(images(`cache/${imgcache+2}.png`), dimensions[2].width + 60, dimensions[2].height)
          .draw(images(`cache/${imgcache+3}.png`), dimensions[3].width + 90, dimensions[3].height)
          .draw(images(`cache/${imgcache+4}.png`), dimensions[4].width + 120, dimensions[4].height)
          .save(`cache/${imgcache+5}.png`, {
            quality: 50
          });

        message.reply({
          files: [`cache/${imgcache+5}.png`]
        });
        //message.reply(`Turn: ${turns}\n${wordResponse}`);
      }
    });
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
      if (finishedGame == false) {
        message.reply(`Time's Up! The word was: ${finalWord}`);
      }
    });
  }
});

client.login(config.token);