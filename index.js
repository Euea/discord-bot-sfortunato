const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`Bot online!`);
  bot.user.setActivity(`niende`);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = '.';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}numero`){
    var estratto = Math.floor(Math.random() * 90) + 1;
    switch(n) {
      case 1,2,3,4,5,6,7,8,9:
        message.channel.send("http://euea.altervista.org/n/0" + estratto + ".jpg");
        break;
      default:
        message.channel.send("http://euea.altervista.org/n/" + estratto + ".jpg");
    }
    message.channel.send(estratto);
  }
});

bot.login(process.env.token);
