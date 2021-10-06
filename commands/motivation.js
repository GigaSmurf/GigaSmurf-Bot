const Discord =require('discord.js')
const {MessageEmbed} = require('discord.js')
const quotes = require("success-motivational-quotes");
module.exports = {
    name: 'motivation', 
    description: 'displays random motivational words',
    execute(message, args){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const exampleEmbed = new MessageEmbed()
	.setColor(`#${randomColor}`)
    .setDescription(quotes.getTodaysQuote().body)
	.setFooter(quotes.getTodaysQuote().by);
    message.channel.send(exampleEmbed);
    }
}