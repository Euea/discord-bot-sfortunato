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
  //bot.user.setActivity(`niende`);
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
    var colors = ["eeeeee", "ff0000","ff4000","ff8000","ffbf00","ffff00","bfff00","80ff00","00ff40","00ff80","00ffff","00bfff","0080ff","0040ff","4000ff","8000ff","ff00ff","ff0080","777777","000000"];
    var rcolor = colors[Math.floor(Math.random() * 18)];
    
    // MONETA - Testa o croce
    if((chan == `games` || chan == `spam-musica`) && text == `.moneta`) {
      //bot.user.setActivity(`testa o croce`);
      var estratto = Math.floor(Math.random() * 2);
      if(estratto < 1) {
        estratto = `croce`;
      }
      else {
        estratto = `testa`;
      }
      postembed = new Discord.RichEmbed()
        .setColor('#'+rcolor)
        .setAuthor('»', 'https://euea.altervista.org/moneta/v1/moneta.png', '')
        .setDescription(message.author.toString() + ' ha lanciato una moneta...\nEd esce '+estratto+'.')
        .setImage('https://euea.altervista.org/moneta/v1/'+estratto+'.png')
        .setThumbnail(message.author.avatarURL)
        .setFooter('TESTA O CROCE', '')
        .setTimestamp();
      message.channel.send(postembed);
      message.delete(message);
      return;
    }
    
    // DADO - Numero casuale da 1 a 6
    else if((chan == `games` || chan == `spam-musica`) && text == `.dado`) {
      //bot.user.setActivity(`dadi`);
      var estratto = Math.floor(Math.random() * 6) + 1;
      postembed = new Discord.RichEmbed()
        .setColor('#'+rcolor)
        .setAuthor('»', 'https://euea.altervista.org/dado/v1/dado.png', '')
        .setDescription(message.author.toString() + ' ha tirato un dado...\nEd esce '+estratto+'.')
        .setImage('https://euea.altervista.org/dado/v1/'+estratto+'.png')
        .setThumbnail(message.author.avatarURL)
        .setFooter('TIRA IL DADO', '')
        .setTimestamp();
      message.channel.send(postembed);
      message.delete(message);
      return;
    }
    
    // ROULETTE - Numero casuale da 0 a 36
    else if((chan == `games` || chan == `spam-musica`) && text == `.roulette`) {
      //bot.user.setActivity(`roulette`);
      var estratto = Math.floor(Math.random() * 37);
      postembed = new Discord.RichEmbed()
        .setColor('#'+rcolor)
        .setAuthor('»', 'https://euea.altervista.org/roulette/v1/roulette.png', '')
        .setDescription(message.author.toString() + ' fa girare la roulette...\nEd esce '+estratto+'.')
        .setImage('https://euea.altervista.org/roulette/v1/'+estratto+'.png')
        .setThumbnail(message.author.avatarURL)
        .setFooter('ROULETTE', '')
        .setTimestamp();
      message.channel.send(postembed);
      message.delete(message);
      return;
    }
    
    // LOTTO - Numero casuale da 1 a 90
    else if((chan == `games` || chan == `spam-musica`) && text == `.lotto`) {
      //bot.user.setActivity(`lotto`);
      var estratto = Math.floor(Math.random() * 90) + 1;
      var numero = '';
      if(estratto < 10) {
        numero = '0'+estratto;
      }
      else {
        numero = estratto;
      }
      postembed = new Discord.RichEmbed()
        .setColor('#'+rcolor)
        .setAuthor('»', 'https://euea.altervista.org/lotto/v1/lotto.png', '')
        .setDescription(message.author.toString() + ' estrae un numero...\nEd esce '+estratto+'.')
        .setImage('https://euea.altervista.org/lotto/v1/'+estratto+'.png')
        .setThumbnail(message.author.avatarURL)
        .setFooter('LOTTO', '')
        .setTimestamp();
      message.channel.send(postembed);
      message.delete(message);
      return;
    }
    
    // TOMBOLA
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola`) {
      //bot.user.setActivity(`tombola`);
      db.run(`CREATE TABLE IF NOT EXISTS tombola (gestore TEXT, mancanti TEXT, estratti TEXT)`);
      db.get('SELECT * FROM tombola WHERE gestore ="'+message.author.toString()+'" LIMIT 1').then(row => {
        if(!row) {
          var mancanti = `01`;
          var i;
          for (i = 2; i < 91; i++) { 
            if(i < 10) {
              numero = '0'+i;
            }
            else {
              numero = i;
            }
            mancanti = mancanti+', '+numero;
          }
          var estratti = `0`;
          db.run('INSERT INTO tombola (gestore, estratti, mancanti) VALUES (?, ?, ?)', [message.author.toString(), estratti, mancanti]);
          postembed = new Discord.RichEmbed()
            .setColor('#'+rcolor)
            .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
            .setDescription(message.author.toString() + ' ha avviato una nuova partita...\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".')
            .setThumbnail(message.author.avatarURL)
            .setFooter('TOMBOLA', '')
            .setTimestamp();
          message.channel.send(postembed);
        }
        else {
          postembed = new Discord.RichEmbed()
            .setColor('#'+rcolor)
            .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
            .setDescription(message.author.toString() + ' hai già avviato una partita...\nScrivi ".tombola numero" per estrarre un numero, scrivi ".tombola fine" per chiudere la partita e poterne iniziare una nuova con il comando ".tombola".')
            .setThumbnail(message.author.avatarURL)
            .setFooter('TOMBOLA', '')
            .setTimestamp();
          message.channel.send(postembed);
        }
        message.delete(message);
        return;
      });
    }
    
    // TOMBOLA NUMERO
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola numero`) {
      db.get(`SELECT * FROM tombola WHERE gestore ="${message.author.toString()}" LIMIT 1`).then(row => {
        if(!row) {
          postembed = new Discord.RichEmbed()
            .setColor('#'+rcolor)
            .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
            .setDescription(message.author.toString() + ' non hai avviato alcuna partita...\nScrivi ".tombola" per avviare una nuova partita.')
            .setThumbnail(message.author.avatarURL)
            .setFooter('TOMBOLA', '')
            .setTimestamp();
          message.channel.send(postembed);
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
            db.run(`DELETE FROM tombola WHERE gestore = "${message.author.toString()}"`);
            postembed = new Discord.RichEmbed()
              .setColor('#'+rcolor)
              .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
              .setDescription(message.author.toString() + ' estrae un numero...\nEd esce '+estratto+'. Tutti i numeri sono stati estratti, la partita è conclusa.')
              .setImage('https://euea.altervista.org/tombola/v1/'+estratto+'.png')
              .setThumbnail(message.author.avatarURL)
              .setFooter('TOMBOLA', '')
              .setTimestamp();
            message.channel.send(postembed);
          }
          else {
            db.run(`UPDATE tombola SET mancanti = "${upmancanti}", estratti = "${upestratti}" WHERE gestore = "${message.author.toString()}"`);
            postembed = new Discord.RichEmbed()
              .setColor('#'+rcolor)
              .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
              .setDescription(message.author.toString() + ' estrae un numero...\nEd esce '+estratto+'. Tutti i numeri estratti: '+upestratti+'.')
              .setImage('https://euea.altervista.org/tombola/v1/'+estratto+'.png')
              .setThumbnail(message.author.avatarURL)
              .setFooter('TOMBOLA', '')
              .setTimestamp();
            message.channel.send(postembed);
          }
        }
        message.delete(message);
        return;
      });
    }
    
    // TOMBOLA FINE
    else if((chan == `games` || chan == `spam-musica`) && text == `.tombola fine`) {
      postembed = new Discord.RichEmbed()
        .setColor('#'+rcolor)
        .setAuthor('»', 'https://euea.altervista.org/tombola/v1/tombola.png', '')
        .setDescription(message.author.toString() + ' ha interrotto la partita.\nScrivi ".tombola" per iniziare una nuova partita.')
        .setThumbnail(message.author.avatarURL)
        .setFooter('TOMBOLA', '')
        .setTimestamp();
      message.channel.send(postembed);
      db.run(`DELETE FROM tombola WHERE gestore = "${message.author.toString()}"`);
      message.delete(message);
      return;
    }
    
    // EREPUBLIK WIKI
    else if(text.substring(0,6) == `.wiki `) {
      postembed = new Discord.RichEmbed()
        .setColor('#3c95ce')
        .setAuthor('»', 'https://wiki.erepublik.com/images/8/8a/Logo_wiki.png', '')
        .setDescription(message.author.toString() + ' clicca qui per info: ' + text.substring(6))
      // https://wiki.erepublik.com/index.php?search=afkashfsa
        .setThumbnail(message.author.avatarURL)
        .setFooter('EREPUBLIK WIKI', '')
        .setTimestamp();
      message.channel.send(postembed);
      return;
    }
    
    else  {
      return;
    }

  }
});

bot.login(process.env.token);
