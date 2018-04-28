const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('message', (message) => {
    var message_content = message.content.toLowerCase();
    var channel_name = message.channel.name;
    var author_name = message.author.toString();
    var author_id = message.author.id.toString();
    if(message_content == '.numero') {
        var estratto = Math.floor(Math.random() * 90) + 1;
        if(estratto == 1) { estratto = "0" + estratto + "! L'ITALIA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 2) { estratto = "0" + estratto + "! 'A PICCERELLA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 3) { estratto = "0" + estratto + "! 'A JATTA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 4) { estratto = "0" + estratto + "! 'O PUORCO http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 5) { estratto = "0" + estratto + "! 'A MANO http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 6) { estratto = "0" + estratto + "! CHELLA CA GUARDA 'NTERRA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 7) { estratto = "0" + estratto + "! 'O VASETTO http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 8) { estratto = "0" + estratto + "! 'A MARONNA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 9) { estratto = "0" + estratto + "! 'A FIGLIATA http://euea.altervista.org/n/0" + estratto + ".jpg"; }
        else if(estratto == 10) { estratto = estratto + "! 'E FASULE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 11) { estratto = estratto + "! 'E SURICILLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 12) { estratto = estratto + "! 'O SURDATO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 13) { estratto = estratto + "! SANT'ANTONIO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 14) { estratto = estratto + "! 'O MBRIACO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 15) { estratto = estratto + "! 'O GUAGLIONE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 16) { estratto = estratto + "! 'O CULO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 17) { estratto = estratto + "! 'O CROQUE MONSIEUR http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 18) { estratto = estratto + "! 'A PASSION http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 19) { estratto = estratto + "! 'A RESATA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 20) { estratto = estratto + "! 'A FESTA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 21) { estratto = estratto + "! 'A FEMMENE ANNURA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 22) { estratto = estratto + "! 'O PAZZO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 23) { estratto = estratto + "! 'O SCEMO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 24) { estratto = estratto + "! 'E GGUARDIE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 25) { estratto = estratto + "! NATALE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 26) { estratto = estratto + "! NANNINELLA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 27) { estratto = estratto + "! 'O CANTARO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 28) { estratto = estratto + "! 'E ZIZZE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 29) { estratto = estratto + "! 'O PATE D' 'E CRIATURE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 30) { estratto = estratto + "! 'E PALLE D' 'O TENENTE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 31) { estratto = estratto + "! 'O PATRONE 'E CASA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 32) { estratto = estratto + "! 'O CAPITONE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 33) { estratto = estratto + "! L'ANNE 'E CRISTO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 34) { estratto = estratto + "! 'A CAPA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 35) { estratto = estratto + "! 'AUCIELLUZZO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 36) { estratto = estratto + "! 'E CASTAGNELLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 37) { estratto = estratto + "! 'O MONACO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 38) { estratto = estratto + "! 'E MMAZZATE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 39) { estratto = estratto + "! 'A FUNE NGANNO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 40) { estratto = estratto + "! 'A NOJA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 41) { estratto = estratto + "! 'O CURTIELLO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 42) { estratto = estratto + "! 'O CCAFE' http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 43) { estratto = estratto + "! ONNA PERETA FORE O BARCONE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 44) { estratto = estratto + "! 'E CCANCELLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 45) { estratto = estratto + "! 'O VINO BBUONO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 46) { estratto = estratto + "! 'E DENARE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 47) { estratto = estratto + "! 'O MUORTO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 48) { estratto = estratto + "! 'O MUORTO CHE PPARLA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 49) { estratto = estratto + "! 'A CARNE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 50) { estratto = estratto + "! 'O PPANE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 51) { estratto = estratto + "! 'O CIARDINO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 52) { estratto = estratto + "! 'A MAMMA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 53) { estratto = estratto + "! 'O VIECCHIO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 54) { estratto = estratto + "! 'O CAPPIELLO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 55) { estratto = estratto + "! 'A MUSECA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 56) { estratto = estratto + "! 'A CADUTA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 57) { estratto = estratto + "! 'O SCARTELLATO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 58) { estratto = estratto + "! 'O REGALO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 59) { estratto = estratto + "! 'E PILE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 60) { estratto = estratto + "! 'O LAMIENTO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 61) { estratto = estratto + "! 'O CACCIATORE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 62) { estratto = estratto + "! 'O MUORTO ACCISO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 63) { estratto = estratto + "! 'A SPOSA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 64) { estratto = estratto + "! 'A SCIAMMERIA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 65) { estratto = estratto + "! 'O CHIANTO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 66) { estratto = estratto + "! 'E DDOJE ZETELLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 67) { estratto = estratto + "! 'O TOTARO DINT' 'A CHITARRA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 68) { estratto = estratto + "! 'A ZUPPA COTTA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 69) { estratto = estratto + "! SOTT'E 'NCOPPA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 70) { estratto = estratto + "! 'O PALAZZO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 71) { estratto = estratto + "! L'OMM 'E MMERD http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 72) { estratto = estratto + "! 'A MERAVIGLIA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 73) { estratto = estratto + "! 'O SPITALE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 74) { estratto = estratto + "! 'A GROTTA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 75) { estratto = estratto + "! PULECENELLA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 76) { estratto = estratto + "! 'A FUNTANA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 77) { estratto = estratto + "! 'E RIAVULILLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 78) { estratto = estratto + "! 'A BELLA FIGLIOLA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 79) { estratto = estratto + "! 'O MARIUOLO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 80) { estratto = estratto + "! 'A VOCCA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 81) { estratto = estratto + "! 'E SCIURE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 82) { estratto = estratto + "! 'A TAVULA APPARICCHIATA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 83) { estratto = estratto + "! 'O MALETIEMPO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 84) { estratto = estratto + "! 'A CHIESA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 85) { estratto = estratto + "! L'ANEMA D' 'O PRIATORIO http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 86) { estratto = estratto + "! 'A PUTECA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 87) { estratto = estratto + "! 'E PERUCCHE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 88) { estratto = estratto + "! 'E CASECAVALLE http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 89) { estratto = estratto + "! 'A VECCHIA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        else if(estratto == 90) { estratto = estratto + "! 'A PAURA http://euea.altervista.org/n/" + estratto + ".jpg"; }
        message.channel.send(author_name + ' estrae un numero da 1 a 90... ' + estratto);
        message.channel.send('Partecipa alle estrazioni a premio, manda un PM con il tuo numero ad @Euea ogni giorno.');
    }
})
bot.login('process.env.BOT_TOKEN');
