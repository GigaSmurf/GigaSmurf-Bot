const Discord = require('discord.js');

module.exports ={
    name: "helphere",
    description: "Send the channel a list of the smurf commands",
    execute(message,args){
        const Embed = new Discord.MessageEmbed()
        .setColor("#EFE50D")
        .setTitle("Bot Commands")
        .setDescription('Use the prefix "-" before each command')
        .addFields(
            {name: 'General',value:"``-ignore`` - Tells GigaSmurf to ignore the invalid commands\n``-hello`` - Says hello to you\n``-ping`` - Tests my speed\n``-poll <{time}m or {time}s> {question}`` - Creates a yes/no poll for {time} minutes or seconds\n``-timeout @username <{time}m or {time}s>`` - Puts a user in timeout for {time} minutes or seconds\n``-weather {someplace on earth}`` - Displays the weather condition of a specified place"},
            {name: 'League of Legends', value:"``-lol {summoner name}`` - Searches a LoL player\n``-live {summoner name}`` - Displays the Live Game Info of a LoL player\n``-champions {page number}`` - Displays a list of champions (3 pages)\n``-champion {name}`` - Details champion information"},
            {name: 'Game',value:"``-scrims {game name}`` - Initiates {game name} Scrims\n``-join`` - Puts you into the scrims\n``-join @username`` - Puts @username into the scrims\n``-remove`` - Removes you from the scrims\n``-remove @username`` - Removes @username from the scrims\n``-players`` - Shows how many players are in the scrims\n``-teams`` - Shows the scrims lineup\n``-shuffle`` - Shuffles up the scrims lineup\n``-scrimsclear`` - Resets the scrims\n``-win {team #(1 or 2)}`` - Gives the win to the winning team and gives them elo\n**tip: cross-server functions can be used to host multiple scrims*"},
            {name: 'Cross-Server', value:"``-create {match roomname}`` - Creates an online scrims match\n``-match {@username1 @username2...list of players} {match roomname}`` - Adds the team to the scrims match\n``-show {match roomname}`` - Shows the scrims match teams for a specified match\n``-win {team #(1 or 2)} {match roomname}`` - Gives elo to the winning team and closes the match room"},
            {name: 'Chess', value:"``-openinglist`` - Shows the list of openings I have available\n``-opening {opening name/keywords}`` - Shows the opening in detail"},
            {name: 'Movie',value:"``-add {movie}`` - Adds a movie to the unviewed list\n``-delete {movie}`` - Deletes a movie from the unviewed list\n``-unviewed`` - Displays the unviewed list\n``-viewed`` - Displays the viewed list\n``-watch {movie}`` - Moves the movie watched from the unviewed list to the viewed list\n``-viewdelete {movie}`` - Deletes a movie from the viewed list\n``-moviepoll <{time}m or {time}s>`` - Creates a poll from the unviewed list (top 10) for a certain amount of time"},
            {name: 'Info', value: "``-help`` - Sends you a list of commands\n``-helphere`` - Sends the channel a list of commands\n``-link`` - Invite me to your server!\n ``-website`` - Sends a link to the GigaSmurf website"}
        )
        .setFooter("Version: Beta 1.69");

        message.channel.send(Embed);
    }
}