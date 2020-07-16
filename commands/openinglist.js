const Discord = require('discord.js');

module.exports ={
    name: 'openinglist',
    description: 'This command shows the list of openings',
    execute(message,args){
        const openinglist = new Discord.MessageEmbed()
      .setTitle("Chess Openings")
      .setColor('#739654')
      .addField("e4", "Sicilian Defense, Sicilian Defense(Closed), Sicilian Defense(Alapin Variation), French Defense, Ruy Lopez Opening, Caro-Kann Opening, Italian Game, Scandinavian Defense, Alekhine's Defense, King's Gambit, Scotch Game ",false)
      .addField("d4","Queen's Gambit, Slav Defense, King's Indian Defense, Nimzo-Indian Defense, Queen's Indian Defense, Dutch Defense, Trompowsky Attack, Benko Gambit, London System",false)
      .addField("Other","Catalan Opening, Reti Opening, English Opening, King's Indian Attack, Bongcloud Attack",false)
      .setFooter("Type -opening {opening name/keywords} for details");

      message.channel.send(openinglist);
    }
}