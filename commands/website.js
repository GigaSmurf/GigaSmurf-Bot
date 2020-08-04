const Discord = require('discord.js')

module.exports ={
    name: 'website',
    description: 'This sends a link to the GigaSmurf website',
    execute(message,args){
        const Embed = new Discord.MessageEmbed()
        .setColor('#520EF0')
        .setTitle("GigaSmurf Website")
        .setURL('https://gigasmurf.tk/')
        .setThumbnail('https://gigasmurf.tk/yuumiawe.jpg');

        message.channel.send(Embed);
    }
}