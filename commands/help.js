const Discord = require('discord.js');

module.exports ={
    name: "help",
    description: "Send the user a dm of the smurf commands",
    execute(message,args){
        const Embed = new Discord.MessageEmbed()
        .setColor("#EFE50D")
        .setTitle("Bot Commands")
        .setDescription('Use the prefix "-" before each command')
        .addFields(
            {name: 'General',value:"``-hello`` - Says hello to you\n``-ping`` - Tests my speed\n``-poll <time in min> {message}`` - Creates a yes/no poll\n``-timeout {@username} <time>m`` - Puts a user in timeout for <time> minutes(m)\n``-timeout {@username} <time>s`` - Puts a user in timeout for <time> seconds(s)"},
            {name: 'Game',value:"``-lol {summoner name}`` - Searches a LoL player\n``-scrims {gametype}`` - Initiates {gametype} Scrims\n``-join`` - Puts you into the scrims\n``-remove`` - Removes you from the scrims\n``-remove {@username}`` - Removes {@username} from the scrims\n``-players`` - Shows how many players are in the scrims\n``-teams`` - Shows the scrims lineup\n``-shuffle`` - Shuffles up the scrims lineup\n``-scrimsclear`` - Resets the scrims"},
            {name: 'Movie',value:"Coming Soon!"},
            {name: 'Info', value: "``-help`` - Sends you a list of commands\n``-helphere`` - Sends the channel a list of commands\n``-link`` - Invite me to your server!\n``-gigasmurf`` - Reveals the **GigaSmurf**\n "}
        )
        .setFooter("Version: Alpha 1.0");

        message.author.send(Embed);
    }
}