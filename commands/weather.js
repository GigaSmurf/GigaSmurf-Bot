const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'This command displays the weather condition of a given place',
    execute(message,args){
        weather.find({search: args.slice(1).join(" "), degreeType: 'F'}, function(err, result){
            if(err) message.channel.send(err);
    
            if (result === undefined || result.length === 0){
              message.channel.send("**I don't know where that is 😔**")
              return;
            }
    
            //sends the rough version of the current weather
            //message.channel.send(JSON.stringify(result[0].current, null, 2));
    
            //variables 
            var current = result[0].current;
            var location = result[0].location;
    
            //Embed
            const Embed3 = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('#E5FF61')
            .addField('Timezone',`UTC${location.timezone}`,true)
            .addField('Winds', current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`,true)
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`,true)
            .addField('Feels Like',`${current.feelslike} Degress`, true)
            .setFooter(`I observed this on ${current.day}, ${current.observationtime}`)
            .setTimestamp();
    
            message.channel.send(Embed3)
          });
    }
}