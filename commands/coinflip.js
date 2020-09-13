const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: 'Heads or Tails',
    execute(message,args){
        let randomnum = Math.floor(Math.random() * 2 ); 
        if(randomnum == 0){
            message.channel.send('Heads');
        }
        else{
            message.channel.send('Tails');
        }
    }
}