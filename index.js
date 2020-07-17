const Discord = require('discord.js');
const bot = new Discord.Client();



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

  let club = 0;
  //chess club feature
  bot.guilds.cache.forEach((guild) => {
    if(guild.name === "CRHS CHESS CLUB" && guild.id === '731258551703699517'){
      let role = guild.roles.cache.find(role => role.name === "Knight");
      member.roles.add(role);
      club = 1;
    }
  })

  if(club === 1){
    channel.send(`Welcome to CRHS Chess Club, ${member}! Please read ♘#rules♘ for info.`);
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
let status = 0;
let players = [];
let gametype = "";
bot.on('message', message => {
  //this ignores a message that is not a calling the bot and messages from other bots
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  //this creates an array of what the user is commanding
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]){

    case "help":
      bot.commands.get('help').execute(message,args);
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
      if(status !== 0){ message.channel.send("Someone already started the scrims!");}
      else{
      status = 1;
      gametype = args.slice(1).join(" ");
      message.channel.send(`We are playing ${gametype} scrims!`);
      }
      break;
    case 'join':
      let player = message.author;
      status = 1;
      joinscrims(message, args, player);
      break;
    case 'remove':
      let removedplayer = "";
      if(!args[1]){
        players = players.filter(player => player!==message.author);
        message.channel.send(`${message.author} has been removed from the scrims`)
      }
      else{
        let removedplayer = args[1].substring(3,args[1].length-1);
        players = players.filter(player => player.id!==removedplayer);
        message.channel.send(`${args[1]} has been removed from the scrims`)
      }

      break;
    case 'players':
      let num = players.length;
      let allplayers = players.join();
      if(players.length ===0){
        message.channel.send("There are no players in the scrims at the moment 😢")
      }
      else{
      message.channel.send(`${allplayers} are in the game and we have ${num} player(s)`);}
      break;
    case 'scrimsclear':
      players = [];
      status = 0;
      gametype = "";
      message.channel.send("The scrims have been cleared");
      break;
    case 'shuffle':
      shuffle(message);
      break;
    case 'teams':
      displayTeams(message);
      break;
    case 'gigasmurf':
      bot.commands.get('gigasmurf').execute(message,args);
      break;
    case 'Spinjamin':
      bot.commands.get('Spinjamin').execute(message,args);
      break;
    case 'link':
      bot.commands.get('link').execute(message,args);
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

function joinscrims(message,args,username){
  message.channel.send(`${username} has joined the scrims`);
  players.push(username);
  if(players.length===10){
    displayTeams(message);
  }
}

function displayTeams(message){
  const gameEmbed = new Discord.MessageEmbed()
    .setColor('#0357FD')
    .setTitle(`${gametype} Scrims`)
    .setDescription('-shuffle to shuffle the teams')
    .addFields(
      {name: 'Team 1', value: `${players[0]}`,  inline: true},
      { name: '\u200B', value: '\u200B', inline:true },
      { name: 'Team 2', value:`${players[1]}`, inline: true}, 
      {name: '\u200B', value: `${players[2]}`,  inline: true},
      { name: '\u200B', value: '\u200B', inline:true },
      { name: '\u200B', value:`${players[3]}`, inline: true},   
      {name: '\u200B', value: `${players[4]}`,  inline: true},
      { name: '\u200B', value: '\u200B', inline:true },
      { name: '\u200B', value:`${players[5]}`, inline: true},   
      {name: '\u200B', value: `${players[6]}`,  inline: true},
      { name: '\u200B', value: '\u200B', inline:true },
      { name: '\u200B', value:`${players[7]}`, inline: true},   
      {name: '\u200B', value: `${players[8]}`,  inline: true},
      { name: '\u200B', value: '\u200B', inline:true },
      { name: '\u200B', value:`${players[9]}`, inline: true},    
    )
    .setTimestamp(new Date())
    .setFooter('Good Luck Summoners!');
    
  message.channel.send(gameEmbed);
}

//shuffled using the fisher-yates shuffle algorithm
function shuffle(message){
  var swap, rand; 

  for (let index = players.length; index > 0; index--) {
    
    rand = Math.floor(Math.random() * index);

    swap = players[index];
    players[index] = players[rand];
    players[rand] = swap; 
   }
  message.channel.send("Players were shuffled");
  displayTeams(message);
  
}

bot.login(process.env.token);