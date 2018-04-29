const Discord = require("discord.js")
const fs = require("fs");
const dbfile = "./database.sqlite";
const db = require("sqlite");
db.open(dbfile);
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`Bot online!`);
  bot.user.setActivity(`niende`);
});

bot.on("message", async message => {
  if(message.author.bot) {
    return;
  }
  else if(message.channel.type === "dm") {
    return;
  }
  else {
    let prefix = '.';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

  
    if(message.channel.name == "games" && cmd === `${prefix}numero`) {
      let smorfia = ["Saab", "Volvo", "BMW"];
      let estratto = Math.floor(Math.random() * 90) + 1;
      if(estratto < 10) {
          message.channel.send(`${message.author.toString()} estrae: http://euea.altervista.org/numero/v1/0${estratto}.png`);
      }
      else {
          message.channel.send(`${message.author.toString()} estrae: http://euea.altervista.org/numero/v1/${estratto}.png`);
      }
    }
  }
});

bot.login(process.env.token);
