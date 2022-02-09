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
const {
  MessageActionRow,
  MessageButton
} = require('discord.js');
const buttonfilter = i => i.user.id === `${message.author.id}`;

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

    var finalWord = "";
    var currentChannel = message.channel;
    var blacklist = ["porno", "xhtml", "htmls", "jenny", "honda"];

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

    if (!words.check(finalWord) || blacklist.includes(finalWord))
      return message.reply("An error occured. Please run the command again");
    const idWords = new Map();
    idWords.set(`${message.author.id}`, `${finalWord}`);

    const buttonCollector = message.channel.createMessageComponentCollector({
      buttonfilter,
      time: 30000
    });

    var hiddenMode = true;
    var hasInputted = false;

    buttonCollector.on('collect', async i => {
      if (i.customId === 'classic') {
        await i.update({
          content: 'Classic Mode Selected.',
          components: []
        });
        message.reply("Please enter a 5-letter word, e.g. \`crate\`. Type \`end\` to end the game.");
        hasInputted = true;
        buttonCollector.stop();
      }
      if (i.customId === 'zen') {
        await i.update({
          content: 'Zen Mode Selected.',
          components: []
        });
        maxTries = 100;
        gameTime = 1200000;
        message.reply("Please enter a 5-letter word, e.g. \`crate\`. Type \`end\` to end the game.");
        hasInputted = true;
        buttonCollector.stop();
      }
      if (i.customId === 'crunch') {
        await i.update({
          content: 'Crunch Mode Selected.',
          components: []
        });
        gameTime = 30000;
        message.reply("Please enter a 5-letter word, e.g. \`crate\`. Type \`end\` to end the game.");
        hasInputted = true;
        buttonCollector.stop();
      }
      if (i.customId === 'hidden') {
        await i.update({
          content: 'Hidden Mode Selected.',
          components: []
        });
        hiddenMode = true;
        message.reply("Please enter a 5-letter word, e.g. \`crate\`. Type \`end\` to end the game.");
        hasInputted = true;
        buttonCollector.stop();
      }
      if (i.customId === 'help') {
        await i.update({
          content: 'Opening Help Menu.',
          components: []
        });
        const help = new MessageEmbed()
          .setColor('#57ac78')
          .setTitle('Disword Help')
          //.setURL('https://discord.js.org/')
          .setAuthor({
            name: 'Disword',
            iconURL: 'https://raw.githubusercontent.com/ArnavD74/Disword/master/images/Logos/icon.png',
            url: 'https://raw.githubusercontent.com/ArnavD74/Disword/master/images/Logos/icon.png'
          })
          .setDescription("\u200B")
          .setThumbnail('https://raw.githubusercontent.com/ArnavD74/Disword/master/images/Logos/icon.png')
          .addFields({
            name: 'Classic',
            value: 'Five turns. Ten minutes.'
          }, {
            name: 'Zen',
            value: 'A hundred turns. Twenty minutes.'
          }, {
            name: 'Crunch',
            value: 'Five turns. Thirty seconds.'
          }, {
            name: '\u200B',
            value: '\u200B'
          }, {
            name: '**How to play**',
            value: 'You are given six chances to guess a randomly selected five-letter word. A letter that isn\'t in the word in any spot shows up gray. A letter somewhere in the word shows up yellow. And a letter that is in the right spot in the word is green.'
          })
          .setImage('https://raw.githubusercontent.com/ArnavD74/Disword/master/images/Logos/miniBanner.png')
          .setTimestamp()
          .setFooter({
            text: 'Created by alt#0001',
            //iconURL: 'https://raw.githubusercontent.com/ArnavD74/Disword/master/images/Logos/icon.png'
          });
        return currentChannel.send({
          embeds: [help]
        });
      }
    });
    const {
      MessageEmbed
    } = require('discord.js');

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('classic')
        .setLabel('Classic')
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('zen')
        .setLabel('Zen')
        .setStyle('DANGER'),
        new MessageButton()
        .setCustomId('crunch')
        .setLabel('Crunch')
        .setStyle('SUCCESS'),
        new MessageButton()
        .setCustomId('hidden')
        .setLabel('Hidden')
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('help')
        .setLabel('Help')
        .setStyle('SECONDARY'),
      );

    message.reply({
      content: 'Welcome back to Disword!',
      components: [row]
    });

    var letters = ["gray", "gray", "gray", "gray", "gray"];
    var attempt = "";
    var turns = 1;
    var finishedGame = false;
    var gameTime = 600000;
    var maxTries = 7;

    const filter = m => m.author.id === message.author.id && hasInputted == true;
    const collector = message.channel.createMessageCollector({
      filter,
      time: `${gameTime}`
    });

    collector.on('collect', m => {
      attempt = `${m.content}`.toLowerCase();

      if (attempt === "end") {
        message.reply(`You ended the game. The word was: ${idWords.get(`${message.author.id}`)}`);
        finishedGame = true;
        collector.stop();
      }

      if (words.check(attempt) && attempt.length === 5 && !finishedGame) {
        letters = ["gray", "gray", "gray", "gray", "gray"];
        imgcache++;

        if (turns === maxTries && attempt != idWords.get(`${message.author.id}`))
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

          // var image = images(300, 80);
          // for(var i = 0; i < 6; i++) {
          //   image.draw(images(`cache/${imgcache+i}.png`), dimensions[0].width, dimensions[0].height)
          // }
          // images.save(`cache/${imgcache+7}.png`, {
          //   quality: 50
          // });

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
      } else if (words.length != 5 && !finishedGame) {
        //
      } else {
        if (!finishedGame) {
          message.reply("That word is not 5 letters or is not in English.")
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