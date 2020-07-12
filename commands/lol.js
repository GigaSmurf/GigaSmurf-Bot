const Discord = require('discord.js');

module.exports = {
    name: "lol",
    description: "Searchs the League of Legends summoner!",
    execute(message,args){
        let msgArgs = args.slice(1).join("");
        message.channel.send(`https://na.op.gg/summoner/userName=${msgArgs}`);
    }
}