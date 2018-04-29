const Discord = require("discord.js")
const fs = require("fs");
const dbfile = "./database.sqlite";
const db = require("sqlite");
db.open(dbfile);
const bot = new Discord.Client({disableEveryone: true});
const admin = process.env.admin;

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
    var authorid = message.author.id;

    // LOTTO - Numero casuale da 1 a 90
    if((chan == `games` || chan == `spam-musica`) && text == `.lotto`) {
      bot.user.setActivity(`lotto`);
      var estratto = Math.floor(Math.random() * 90) + 1;
      var numero = ``;
      if(estratto < 10) {
        numero = `0${estratto}`;
      }
      else {
        numero = `${estratto}`;
      }
      message.channel.send(`${message.author.toString()} ha estratto il numero: http://euea.altervista.org/numero/v1/${numero}.png`);
      return;
    }
    
    // ROULETTE - Numero casuale da 0 a 36
    if((chan == `games` || chan == `spam-musica`) && text == `.roulette`) {
      bot.user.setActivity(`roulette`);
      var estratto = Math.floor(Math.random() * 37);
      message.channel.send(`${message.author.toString()} fa un tiro alla roulette: http://euea.altervista.org/roulette/v1/${numero}.png`);
      return;
    }
    
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola`) {
      db.run(`CREATE TABLE IF NOT EXISTS tombola (managerid TEXT, numbers TEXT)`);
      bot.user.setActivity(`tombola`);
      db.get(`SELECT * FROM tombola WHERE managerid ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          db.run(`INSERT INTO tombola (managerid, numbers) VALUES (?, ?)`, [message.author.toString(), "0"]);
          message.channel.send(`${message.author.toString()} ha avviato una nuova partita di tombola.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        else {
          message.channel.send(`${message.author.toString()} hai già avviato una partita di tombola.\nNumeri estratti: ${row.numbers}.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        return;
      });
    }
    
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola numero`) {
      var estratto = Math.floor(Math.random() * 90) + 1;
      var numero = ``;
      var upnumeri = ``;
      if(estratto < 10) {
        numero = `0${estratto}`;
      }
      else {
        numero = `${estratto}`;
      }
      message.channel.send(`${message.author.toString()} ha estratto il numero: http://euea.altervista.org/numero/v1/${numero}.png`);
      db.get(`SELECT * FROM tombola WHERE managerid ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          message.channel.send(`Errore, per favore contatta l'amministratore del bot.`);
        }
        else {
          if(`${row.numbers}` == "0") {
            upnumeri = `${numero}`;
          }
          else {
            upnumeri = `${row.numbers}, ${numero}`;
          }
          db.run(`UPDATE tombola SET numbers = "${upnumeri}" WHERE managerid = "${message.author.toString()}"`);
          message.channel.send(`${message.author.toString()} i tuoi numeri estratti: ${upnumeri}.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
      return;
      });
    }
    
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola fine`) {
      message.channel.send(`${message.author.toString()} ha terminato la partita di tombola. Numeri estratti: . Scrivi ".tombola" per iniziare una nuova partita.`);
      return;
    }
    
    else if(authorid == admin && (chan == `games` || chan == `spam-musica`) && text == `.resetdb`) {
      db.run("DROP TABLE IF EXISTS tombola");
      db.run(`CREATE TABLE IF NOT EXISTS tombola (managerid TEXT, numbers TEXT)`);
      message.channel.send(`Database resettato.`);
      return;
    }
  }
});

bot.login(process.env.token);
