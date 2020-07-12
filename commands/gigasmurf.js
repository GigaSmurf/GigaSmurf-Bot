const Discord = require('discord.js');
const { builtinModules } = require('module');


module.exports = {
    name:'gigasmurf',
    description:'This command reveals the developer behind GiagSmurf Bot!',
    execute(message,args){
        let Embed = new Discord.MessageEmbed()
        .setTitle("Gigasmurf")
        .setDescription("Also known as nalyd#1319 or Dylan Syahputra")
        .setThumbnail('https://i.imgur.com/1izfPNH.jpg')
        .setColor('#267BFF')
        .addFields(
            {name: 'LoL user', value:'Dylan Mid', inline:true},
            {name: 'Age', value: '17', inline:true}
        )
        .addField('Website','coming soon', false);

        message.channel.send(Embed);
    }
    
}