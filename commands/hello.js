const Discord = require('discord.js');

module.exports = {
    name: 'hello',
    description: "This is a hello world command!",
    execute(message, args){
        let player = message.author.username;
        message.channel.send(`hello ${player}`);
        
    }
}