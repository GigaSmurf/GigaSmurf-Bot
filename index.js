const Discord = require('discord.js');
const bot = new Discord.Client();


//initialize firebase firestore
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const { FieldValue } = require('@google-cloud/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gigasmurf-bot.firebaseio.com"
});

const db = admin.firestore();

// firebase ending initialization
const PREFIX = "-"

var version = 'beta';
//run server forever
var http = require('http');

var server = http.createServer(function (request, response) {
  if (request.url === '/') {
    response.setHeader('Content-Type', 'text/html');
    response.end('<strong>Gigasmurf!</strong>');
  }
  console.log(request.url);
});

server.listen(8080, function () {
  console.log('Im listening on port 8080');
});

const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//loop through all of the command files and puts them into the collection
for(const file of commandFiles){
  //imports the files to access the execute command
  const command = require(`./commands/${file}`);

  //initializes the name and the file, and takes in the require module or the file 
  bot.commands.set(command.name, command);
}


bot.on('ready', () => {
  console.log("GigaSmurf activated!")
  //bot.user.setActivity("being developed rn");
  bot.user.setActivity("smurf ⚡commands⚡ | type -help for commands", {type:"LISTENING"});

  


});

//someone joins server
bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
  if(!channel) {channel = member.guild.channels.cache.find(channel =>  channel.name === "general");}
  if(!channel) return;

  //chess club feature
  if(member.guild.name === "CRHS CHESS CLUB" && member.guild.id === "731258551703699517"){
    channel.send(`Welcome to CRHS Chess Club, ${member}! Please read ♘#rules♘ for info.`);
    bot.guilds.cache.forEach((guild) => {
    let role = guild.roles.cache.find(role => role.name === "Knight");
    member.roles.add(role).catch(err => console.log(err));
  });
  }
  else{
    channel.send(`Welcome to our server, ${member}`);
  }

});

//someone leaves server 
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "general");
  if(!channel) return;

  channel.send(`Lata ${member}`)
});




bot.on('message',async message => {
  //this ignores a message that is not a calling the bot and messages from other bots
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  //this creates an array of what the user is commanding
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()){

    case "help":
      bot.commands.get('help').execute(message,args);
      break;
    case 'add':
      bot.commands.get('add').execute(message,args);
      break;
    case 'delete':
      bot.commands.get('delete').execute(message,args);
      break;
    case 'unviewed':
      bot.commands.get('unviewed').execute(message,args);
      break;
    case 'viewed':
      bot.commands.get('viewed').execute(message,args);
      break;
    case 'watch':
      bot.commands.get('watch').execute(message,args);
      break;
    case 'viewdelete':
      bot.commands.get('viewdelete').execute(message,args);
      break;
    case 'moviepoll':
      bot.commands.get('moviepoll').execute(message,args);
      break;
    case "helphere":
      bot.commands.get('helphere').execute(message,args);
      break;
    case 'hello':
      bot.commands.get('hello').execute(message, args);
      
    break;
    case 'poll':
      const Embed = new Discord.MessageEmbed()
      .setColor('#F9421A')
      .setTitle("Inititate Poll")
      .setDescription("-poll (with your query after) to inititate a YES or NO poll");
      if(!args[1]){
        message.channel.send(Embed);
        break;
      }
      bot.commands.get('poll').execute(message,args);
      message.delete({timeout: 5000})
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
      break;
    case 'ping':
      bot.commands.get('ping').execute(message,args);
      break;
    case 'lol':
      bot.commands.get('lol').execute(message,args);
      break;
    case 'timeout':
      bot.commands.get('timeout').execute(message,args);
      break;
    case 'scrims':
      bot.commands.get('scrims').execute(message,args);
      break;
    case 'join':
      bot.commands.get('join').execute(message,args);
      break;
    case 'remove':
      bot.commands.get('remove').execute(message,args);
      break;
    case 'players':
      bot.commands.get('players').execute(message,args);
      break;
    case 'scrimsclear':
      bot.commands.get('scrimsclear').execute(message,args);
      break;
    case 'shuffle':
      bot.commands.get('shuffle').execute(message,args);
      break;
    case 'teams':
      bot.commands.get('teams').execute(message,args);
      break;
    case 'create':
      bot.commands.get('create').execute(message,args);
      break;
    case 'win':
      bot.commands.get('win').execute(message,args);
      break;
    case 'gigasmurf':
      bot.commands.get('gigasmurf').execute(message,args);
      break;
    case 'spinjamin':
      bot.commands.get('Spinjamin').execute(message,args);
      break;
    case 'link':
      bot.commands.get('link').execute(message,args);
      break;
    case 'website':
      bot.commands.get('website').execute(message,args);
      break;
    case 'weather':
      bot.commands.get('weather').execute(message,args);
      break;
    case 'openinglist':
      bot.commands.get('openinglist').execute(message,args);
      break;
    case 'opening':
      bot.commands.get('opening').execute(message,args);
      break;
    default:
      message.channel.send("...-help for the list of commands my fellow smurf.");
    break;

}
})







bot.login(process.env.token);