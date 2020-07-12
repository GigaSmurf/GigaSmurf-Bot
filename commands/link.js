const Discord = require('discord.js')

module.exports ={
    name: 'link',
    description: 'This link invites GigaSmurf to your server',
    execute(message,args){
        const Embed = new Discord.MessageEmbed()
        .setColor('#520EF0')
        .setTitle("Invite GigaSmurf Bot")
        .setURL('https://discord.com/api/oauth2/authorize?client_id=729786914365767813&permissions=8&scope=bot')
        .setThumbnail('https://i.redd.it/849hp76jous41.png');

        message.channel.send(Embed);
    }
}