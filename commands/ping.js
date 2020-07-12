const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "This command tests the speed of GigaSmurf Bot",
    execute(message,args){
        var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send("I am zooming at a ping of `" + `${Date.now() - message.createdTimestamp}` + " ms⚡`");
    }
}