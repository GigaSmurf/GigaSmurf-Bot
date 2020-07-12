const Discord = require('discord.js');
const ms = require('ms');


module.exports = {
    name: 'timeout',
    description: 'This bot times people out for a certain amount of time',
    execute(message,args){
             let cachedRoles = {};
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return  message.channel.send("Hey watchu trying...the boss said you don't have permission");

            var person = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1]));
            if(!person) return message.reply("I CANT FIND THE USER "+ person);

            let muterole = message.guild.roles.cache.find(role => role.name === "mute");

            if(!muterole) return message.reply("Couldn't find the mute role...");

            let time = args[2];
            if(!time){
                return message.reply("You didn't specify a time!");
            }
            
            cachedRoles[person.id] = person.roles.cache;

            person.roles.set([]).then(member => member.roles.add(muterole)).catch(console.error);
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`);

            setTimeout(function (){
                person.roles.set(cachedRoles[person.id])
                message.channel.send(`@${person.user.tag} has now been unmuted.`)
            },ms(time));

    }
}