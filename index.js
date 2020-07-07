const {Client, MessageEmbed} = require('discord.js')
const bot = new Client();

const token = 'NzI5Nzg2OTE0MzY1NzY3ODEz.XwOB7g.JvJNVy42g8R0cSdDo9pwMivbWHA'

const PREFIX = "g!"

var version = 'beta'

bot.on('ready', () => {
  console.log("GigaSmurf activated!")
});

//someone joins server
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "general");
  if(!channel) return;

  channel.send(`Welcome to our server, ${member}`)
});

//someone leaves server 
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "general");
  if(!channel) return;

  channel.send(`Lata ${member}`)
});

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]){

    case "help":

      break;
    default: 
      message.reply("This is an invalid command. Type g!help for commands!")
  }
})

bot.login(token);