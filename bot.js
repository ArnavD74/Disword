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
    var finalWord = "";
    var blacklist = ["syria", "julia", "porno"];

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

    // var dict = []

    // dict.push({
    //   id: message.author.id,
    //   word: finalWord
    // });

    message.reply("Please enter a 5-letter word, e.g. hello");
    var letters = ["gray", "gray", "gray", "gray", "gray"];
    var attempt = "";
    var turns = 1;
    var finishedGame = false;

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      time: 120000
    });

    collector.on('collect', m => {
      message.channel.send('thinking');
      console.log(`captured ${m.content}`);
      attempt = `${m.content}`;

      if (words.check(attempt) && attempt.length === 5) {

        letters = ["gray", "gray", "gray", "gray", "gray"];
        imgcache++;

        if (turns === 7)
          message.reply(`You are out of turns! The word was: ${finalWord}`)
        turns++;

        for (var i = 0; i < 5; i++) {
          if (finalWord.charAt(i) === attempt.charAt(i))
            letters[i] = "green";
          else if (finalWord.includes(attempt.charAt(i)))
            letters[i] = "yellow";
        }

        for (var i = 0; i < 5; i++) {
          fs.writeFileSync(`cache/${imgcache+i}.png`, text2png(`${attempt.toUpperCase().charAt(i)}`, {
            color: `${letters[i]}`
          }));
        }

        fs.writeFileSync(`cache/${imgcache+5}.png`, text2png(`Turn ${turns-1}`, {
          color: 'white',
          font: '12px Sans'

        }));

        var dimensions = [0, 0, 0, 0, 0];
        var imgX = 0;

        for (var i = 0; i < 5; i++) {
          dimensions[i] = sizeOf(`cache/${imgcache+i}.png`)
          imgX += dimensions[i].width;
        }

        images(300, 65)
          .draw(images(`cache/${imgcache}.png`), dimensions[0].width, dimensions[0].height)
          .draw(images(`cache/${imgcache+1}.png`), 10 + dimensions[0].width + dimensions[1].width, dimensions[1].height)
          .draw(images(`cache/${imgcache+2}.png`), 10 + dimensions[0].width + dimensions[1].width + dimensions[2].width, dimensions[2].height)
          .draw(images(`cache/${imgcache+3}.png`), 10 + dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width, dimensions[3].height)
          .draw(images(`cache/${imgcache+4}.png`), 10 + dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width + dimensions[4].width, dimensions[4].height)
          .draw(images(`cache/${imgcache+5}.png`), imgX / 2, 50)
          .save(`cache/${imgcache+6}.png`, {
            quality: 50
          });

        message.reply({
          files: [`cache/${imgcache+6}.png`]
        });

        if (attempt == finalWord) {
          message.reply(`You win!`);
          finishedGame = true;
          collector.stop();
        }

      } else {
        message.reply("That word is not 5 letters or is not in English.")
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