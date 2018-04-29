const Discord = require("discord.js")
const fs = require("fs");
const dbfile = "./database.sqlite";
const db = require("sqlite");
db.open(dbfile);
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  db.run(`CREATE TABLE IF NOT EXISTS tombola (managerid TEXT, numbers TEXT)`);
  bot.user.setActivity(`niende`);
  console.log(`Bot online!`);
});

bot.on("message", async message => {
  if(message.author.bot) {
    return;
  }
  else if(message.channel.type === "dm") {
    return;
  }
  else {
    var text = message.content.toLowerCase();
    var chan = message.channel.name.toLowerCase();

    if(chan == `games` && text == `.numero`) {
      bot.user.setActivity(`dare i numeri`);
      var estratto = Math.floor(Math.random() * 90) + 1;
      if(estratto < 10) {
        message.channel.send(`${message.author.toString()} estrae: http://euea.altervista.org/numero/v1/0${estratto}.png`);
      }
      else {
        message.channel.send(`${message.author.toString()} estrae: http://euea.altervista.org/numero/v1/${estratto}.png`);
      }
    }
    
    else if(chan == `games` && text == `.tombola`) {
      bot.user.setActivity(`tombola`);
      message.channel.send(`Tombola`);

      db.get(`SELECT * FROM tombola WHERE managerid ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          db.run(`INSERT INTO tombola (managerid, numbers) VALUES (?, ?)`, [message.author.toString(), ""]);
          message.channel.send(`Non esiste, lo creo.`);
        }
        else {
          message.channel.send(`Esiste già.`);
        }
      });
      
      else if(chan == `games` && text == `.resetdb`) {
        db.run("DROP TABLE IF EXISTS users");
        message.channel.send(`Database resettato.`);
      }
    }
  }
});

bot.login(process.env.token);
