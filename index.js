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
      console.log(`${estratto}`);
      var numero = ``;
      if(estratto < 10) {
        numero = `0${estratto}`;
      }
      else {
        numero = `${estratto}`;
      }
      message.channel.send(`${message.author.toString()} ha estratto il numero: http://euea.altervista.org/lotto/v1/${numero}.png`);
      return;
    }
    
    // ROULETTE - Numero casuale da 0 a 36
    else if((chan == `games` || chan == `spam-musica`) && text == `.roulette`) {
      bot.user.setActivity(`roulette`);
      var estratto = Math.floor(Math.random() * 37);
      message.channel.send(`${message.author.toString()} fa un tiro alla roulette: http://euea.altervista.org/roulette/v1/${estratto}.png`);
      return;
    }
    
    // MONETA - Testa o croce
    else if((chan == `games` || chan == `spam-musica`) && text == `.moneta`) {
      bot.user.setActivity(`testa o croce`);
      var estratto = Math.floor(Math.random() * 2);
      if(estratto < 1) {
        estratto = `croce`;
      }
      else {
        estratto = `testa`;
      }
      message.channel.send(`${message.author.toString()} lancia una moneta: http://euea.altervista.org/moneta/v1/${estratto}.png`);
      return;
    }
    
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola`) {
      db.run(`CREATE TABLE IF NOT EXISTS tombola (managerid TEXT, numbers TEXT)`);
      bot.user.setActivity(`tombola`);
      db.get(`SELECT * FROM tombola WHERE managerid ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          var resetnumb = `01`;
          var i;
          for (i = 2; i < 91; i++) { 
            if(i < 10) {
              numero = `0${i}`;
            }
            else {
              numero = `${i}`;
            }
            resetnumb = `${resetnumb}, ${numero}`);
          }
          db.run(`INSERT INTO tombola (managerid, numbers) VALUES (?, ?)`, [message.author.toString(), resetnumb]);
          message.channel.send(`${message.author.toString()} ha avviato una nuova partita di tombola.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        else {
          message.channel.send(`${message.author.toString()} hai già avviato una partita di tombola.\nNumeri estratti: ${row.mancanti}.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        return;
      });
    }
    
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola numero`) {
      db.get(`SELECT * FROM tombola WHERE gestore ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          message.channel.send(`Errore, per favore contatta l'amministratore del bot.`);
        }
        else {
          var dbestratti = ${row.estratti};
          var dbmancanti = ${row.mancanti};
          
          var arraymancanti = dbmancanti.split(", ");
          var estratto = arraymancanti[Math.floor(Math.random() * arraymancanti.length)];
          
          var upestratti = `${dbestratti}, ${estratto}`;
          var upmancanti = dbmancanti.replace(`, ${estratto}`, ``);
          
          db.run(`UPDATE tombola SET mancanti = "${upmancanti}", estratti = "${upestratti}" WHERE gestore = "${message.author.toString()}"`);
          
          message.channel.send(`${message.author.toString()} ha estratto il numero: http://euea.altervista.org/lotto/v1/${numero}.png\nTutti i numeri estratti: ${upestratti}.\nScrivi ".tombola numero" per estrarre un altro numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        return;
      });
    }
    
    // Continuo qui
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola fine`) {
      message.channel.send(`${message.author.toString()} ha terminato la partita di tombola. Numeri estratti: . Scrivi ".tombola" per iniziare una nuova partita.`);
      return;
    }
    
    else if(authorid == admin && (chan == `games` || chan == `spam-musica`) && text == `.resetdb`) {
      db.run("DROP TABLE IF EXISTS tombola");
      db.run(`CREATE TABLE IF NOT EXISTS tombola (gestore TEXT, mancanti TEXT, estratti TEXT)`);
      message.channel.send(`Database resettato.`);
      return;
    }
  }
});

bot.login(process.env.token);
