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
const csvWriter = require('csv-write-stream')
const fastcsv = require('fast-csv');
const stream = fs.createReadStream("stats.csv");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var imgcache = 0;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const statsCSV = createCsvWriter({
  path: 'stats.csv',
  header: [{
      id: 'discordID',
      title: 'discordID'
    },
    {
      id: 'gamesPlayed',
      title: 'gamesPlayed'
    },
    {
      id: 'turnsPlayed',
      title: 'turnsPlayed'
    },
    {
      id: 'percentGray',
      title: 'percentGray'
    },
    {
      id: 'percentYellow',
      title: 'percentYellow'
    },
    {
      id: 'percentGreen',
      title: 'percentGreen'
    },
  ]
});

client.on("ready", () => {
  console.log(`Disword is online`);
  client.user.setActivity(`Wordle Games`, {
    type: 'WATCHING'
  });
  client.user.setStatus('online');
});
client.on("messageCreate", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.channel.type === "dm") {
    return message.reply("Sorry, Disword does not work in DMs.");
  }
  //////////////////////////////////////////////////////
  if (command === "start") {

    var gameTime = 600000;
    var finalWord = "";
    if (args[0] === "quick")
      gameTime = 120000;

    // var userID = 0;

    // var idMatch = false;
    // var csvSize = 0;

    // var data = fs.readFileSync('stats.csv')
    //   .toString()
    //   .split('\n')
    //   .map(e => e.trim())
    //   .map(e => e.split(',').map(e => e.trim()));
    // csvSize = (Object.values(data).length - 2);
    // //console.log("Size: " + csvSize);

    // fastcsv
    //   .parseStream(stream, {
    //     headers: true
    //   })
    //   .on("data", function (data) {
    //     console.log(Object.values(data));
    //     console.log(Object.values(data)[0]);
    //     // console.log(Object.values(data)[1]);
    //     // console.log(Object.values(data)[2]);
    //     // console.log(Object.values(data)[3]);
    //     // console.log(Object.values(data)[4]);
    //     // console.log(Object.values(data)[5]);

    //     for (var i = 0; i < csvSize; i++) {
    //       if (Object.values(data)[i].substring(1, Object.values(data)[i].length) == (`${message.author.id}`)) {
    //         //console.log("ID MATCH");
    //         idMatch = true;
    //       }
    //     }
    //   })

    // if (!idMatch) {
    //   const newRecord = [{
    //     discordID: `${message.author.id}`,
    //     gamesPlayed: 0,
    //     turnsPlayed: 0,
    //     percentGray: 0,
    //     percentYellow: 0,
    //     percentGreen: 0,
    //   }];
    //   //percentGray tracks total gray letters. percentGray / (gamesPlayed * 5)

    //   statsCSV.writeRecords(newRecord) // returns a promise
    //     .then(() => {
    //       console.log('Added New User');
    //     });

    // }

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
      console.log(`Final word for ${message.author.id}: ${finalWord}`);
    } catch (err) {
      console.log(err);
      message.reply("An error occured.");
    }

    if (!words.check(finalWord))
      return message.reply("An error occured. Please run the command again");
    const idWords = new Map();
    idWords.set(`${message.author.id}`, `${finalWord}`);
    message.reply("Please enter a 5-letter word, e.g. \`crate\`. Type \`end\` to end the game.");
    var letters = ["gray", "gray", "gray", "gray", "gray"];
    var attempt = "";
    var turns = 1;
    var finishedGame = false;


    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      time: `${gameTime}`
    });

    collector.on('collect', m => {
      //console.log(`captured ${m.content}`);
      attempt = `${m.content}`.toLowerCase();

      if (attempt === "end") {
        message.reply(`You ended the game.`);
        finishedGame = true;
        collector.stop();
      }

      if (words.check(attempt) && attempt.length === 5 && !finishedGame) {

        letters = ["gray", "gray", "gray", "gray", "gray"];
        imgcache++;

        if (turns === 7 && attempt != idWords.get(`${message.author.id}`))
          message.reply(`You are out of turns! The word was: ${idWords.get(`${message.author.id}`)}`)
        turns++;

        for (var i = 0; i < 5; i++) {
          if (idWords.get(`${message.author.id}`).charAt(i) === attempt.charAt(i))
            letters[i] = "#57ac78";
          else if (idWords.get(`${message.author.id}`).includes(attempt.charAt(i)))
            letters[i] = "#dfc861";
        }

        for (var i = 0; i < 5; i++) {
          fs.writeFileSync(`cache/${imgcache+i}.png`, text2png(`${attempt.toUpperCase().charAt(i)}`, {
            color: `${letters[i]}`,
            font: '30px IBM_mono',
            localFontPath: 'fonts/IBMPlexMono-Regular.ttf',
            localFontName: 'IBM_mono'
          }));
        }

        fs.writeFileSync(`cache/${imgcache+5}.png`, text2png(`Turn ${turns-1}`, {
          color: 'white',
          font: '14px IBM',
          localFontPath: 'fonts/IBMPlexSans-Bold.ttf',
          localFontName: 'IBM'
        }));

        var dimensions = [0, 0, 0, 0, 0];
        var imgX = 0;
        for (var i = 0; i < 5; i++) {
          dimensions[i] = sizeOf(`cache/${imgcache+i}.png`)
          imgX += dimensions[i].width;
        }

        if (attempt == idWords.get(`${message.author.id}`)) {
          // fs.writeFileSync(`GG.png`, text2png(`GG!`, {
          //   color: `#53f7fc`,
          //   font: '18px IBM',
          //   localFontPath: 'fonts/IBMPlexSans-Bold.ttf',
          //   localFontName: 'IBM'
          // }));
          images(300, 100)
            .draw(images(`cache/${imgcache}.png`), dimensions[0].width, dimensions[0].height)
            .draw(images(`cache/${imgcache+1}.png`), dimensions[0].width + dimensions[1].width, dimensions[1].height)
            .draw(images(`cache/${imgcache+2}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width, dimensions[2].height)
            .draw(images(`cache/${imgcache+3}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width, dimensions[3].height)
            .draw(images(`cache/${imgcache+4}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width + dimensions[4].width, dimensions[4].height)
            .draw(images(`cache/${imgcache+5}.png`), imgX / 2, 60)
            .draw(images(`GG.png`), (imgX / 2) + 4, 74)
            .save(`cache/${imgcache+7}.png`, {
              quality: 50
            });
          message.reply({
            files: [`cache/${imgcache+7}.png`]
          });
          finishedGame = true;
          collector.stop();
        } else {
          images(300, 80)
            .draw(images(`cache/${imgcache}.png`), dimensions[0].width, dimensions[0].height)
            .draw(images(`cache/${imgcache+1}.png`), dimensions[0].width + dimensions[1].width, dimensions[1].height)
            .draw(images(`cache/${imgcache+2}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width, dimensions[2].height)
            .draw(images(`cache/${imgcache+3}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width, dimensions[3].height)
            .draw(images(`cache/${imgcache+4}.png`), dimensions[0].width + dimensions[1].width + dimensions[2].width + dimensions[3].width + dimensions[4].width, dimensions[4].height)
            .draw(images(`cache/${imgcache+5}.png`), imgX / 2, 60)
            .save(`cache/${imgcache+6}.png`, {
              quality: 50
            });
          message.reply({
            files: [`cache/${imgcache+6}.png`]
          });
        }
      } else {
        if (!finishedGame) {
          if (attempt.length === 5) {
            message.reply("That word is not 5 letters or is not in English.")
          }
        }
      }
    });
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
      if (finishedGame == false) {
        message.reply(`Time's Up! The word was: ${idWords.get(`${message.author.id}`)}`);
      }
    });
  }
  //////////////////////////////////////////////////////
  if (command === "ping") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Network Latency: ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  //////////////////////////////////////////////////////
});

client.login(config.token);