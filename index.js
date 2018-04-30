const Discord = require("discord.js")
const fs = require("fs");
const dbfile = "./database.sqlite";
const db = require("sqlite");
db.open(dbfile);
const bot = new Discord.Client({disableEveryone: true});
const admin = process.env.admin;

bot.on("ready", async () => {
  db.run("DROP TABLE IF EXISTS tombola");
  db.run(`CREATE TABLE IF NOT EXISTS tombola (gestore TEXT, mancanti TEXT, estratti TEXT)`);
  bot.user.setActivity(`niende`);
  console.log(`Bot online!`);
});

bot.on("message", async message => {
  var data = getDate()+`/`+getMonth()+`/`+getYear()+` (`+getHours()+`:`+getMinutes()+`:`+getSeconds()+`)\n`;
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

    
    // MONETA - Testa o croce
    if((chan == `games` || chan == `spam-musica`) && text == `.moneta`) {
      bot.user.setActivity(`testa o croce`);
      var estratto = Math.floor(Math.random() * 2);
      if(estratto < 1) {
        estratto = `croce`;
      }
      else {
        estratto = `testa`;
      }
      message.channel.send(`${data}${message.author.toString()} lancia una moneta: http://euea.altervista.org/moneta/v1/${estratto}.png`);
      message.delete(message);
      return;
    }
    
    // DADO - Numero casuale da 1 a 6
    else if((chan == `games` || chan == `spam-musica`) && text == `.dado`) {
      bot.user.setActivity(`dadi`);
      var estratto = Math.floor(Math.random() * 6) + 1;
      message.channel.send(`${data}${message.author.toString()} tira un dado: http://euea.altervista.org/dado/v1/${estratto}.png`);
      message.delete(message);
      return;
    }
    
    // ROULETTE - Numero casuale da 0 a 36
    else if((chan == `games` || chan == `spam-musica`) && text == `.roulette`) {
      bot.user.setActivity(`roulette`);
      var estratto = Math.floor(Math.random() * 37);
      message.channel.send(`${data}${message.author.toString()} fa un tiro alla roulette: http://euea.altervista.org/roulette/v1/${estratto}.png`);
      message.delete(message);
      return;
    }
    
    // LOTTO - Numero casuale da 1 a 90
    else if((chan == `games` || chan == `spam-musica`) && text == `.lotto`) {
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
      message.channel.send(`${data}${message.author.toString()} ha estratto il numero: http://euea.altervista.org/lotto/v1/${numero}.png`);
      message.delete(message);
      return;
    }
    
    // TOMBOLA
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola`) {
      bot.user.setActivity(`tombola`);
      db.run(`CREATE TABLE IF NOT EXISTS tombola (gestore TEXT, mancanti TEXT, estratti TEXT)`);
      db.get(`SELECT * FROM tombola WHERE gestore ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          var mancanti = `01`;
          var i;
          for (i = 2; i < 91; i++) { 
            if(i < 10) {
              numero = `0${i}`;
            }
            else {
              numero = `${i}`;
            }
            mancanti = `${mancanti}, ${numero}`;
          }
          var estratti = `0`;
          db.run(`INSERT INTO tombola (gestore, estratti, mancanti) VALUES (?, ?, ?)`, [message.author.toString(), `${estratti}`, `${mancanti}`]);
          message.channel.send(`${data}${message.author.toString()} ha avviato una nuova partita di tombola.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        else {
          message.channel.send(`${data}${message.author.toString()} hai già avviato una partita di tombola.\nNumeri estratti: ${row.estratti}.\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
        }
        message.delete(message);
        return;
      });
    }
    
    // TOMBOLA NUMERO
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola numero`) {
      db.get(`SELECT * FROM tombola WHERE gestore ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          message.channel.send(`${data}${message.author.toString()} non hai attivato alcuna partita. Scrivi ".tombola" per iniziare una nuova partita.`);
        }
        else {
          var dbestratti = `${row.estratti}`;
          var dbmancanti = `${row.mancanti}`;
          
          var arraymancanti = dbmancanti.split(", ");
          var estratto = arraymancanti[Math.floor(Math.random() * arraymancanti.length)];
          
          if(dbestratti === `0`){
            var upestratti = `${estratto}`;
          }
          else {
            var upestratti = `${dbestratti}, ${estratto}`;
          }
          var upmancanti = dbmancanti.replace(`, ${estratto}`, ``);
          var upmancanti = upmancanti.replace(`${estratto}, `, ``);
          
          if(arraymancanti.length < 2) {
            message.channel.send(`${data}${message.author.toString()} ha estratto il numero: http://euea.altervista.org/lotto/v1/${estratto}.png\nTutti i numeri sono stati estratti, la partita è conclusa.\nScrivi ".tombola" per iniziare una nuova partita.`);
            db.run(`DELETE FROM tombola WHERE gestore = "${message.author.toString()}"`);
          }
          else {
            db.run(`UPDATE tombola SET mancanti = "${upmancanti}", estratti = "${upestratti}" WHERE gestore = "${message.author.toString()}"`);
            message.channel.send(`${data}${message.author.toString()} ha estratto il numero: http://euea.altervista.org/lotto/v1/${estratto}.png\nTutti i numeri estratti: ${upestratti}.\nScrivi ".tombola numero" per estrarre un altro numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".`);
          }
        }
        message.delete(message);
        return;
      });
    }
    
    // TOMBOLA FINE
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola fine`) {
      message.channel.send(`${data}${message.author.toString()} ha terminato la partita di tombola. Scrivi ".tombola" per iniziare una nuova partita.`);
      db.run(`DELETE FROM tombola WHERE gestore = "${message.author.toString()}"`);
      message.delete(message);
      return;
    }
    
  }
});

bot.login(process.env.token);
