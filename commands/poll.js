const Discord = require('discord.js');
const emojis = require("../emojis.json");
module.exports = {
    name: 'poll',
    description: 'This command creates a yes or no poll to help make a decision',
    async execute(message, args){
        let timelim = args[1] * 60000;
        let msgArgs = args.slice(2).join(" ");

        let pollEmbed = new Discord.MessageEmbed()
        .setColor("#E73D07")
        .setTitle("Poll")
        .setFooter(message.author.username)
        .setImage(message.author.avatarURL)
        .setTimestamp()
        .setDescription(msgArgs);
        
        let yes = 0;
        let no = 0;
        let pollMessage = await message.channel.send(pollEmbed).then(async embedmessage =>{
           await embedmessage.react(emojis.yes);
           await embedmessage.react(emojis.no);

           
           const filter = (reaction, user) => { return (reaction.emoji.name == emojis.yes || reaction.emoji.name == emojis.no) && user.id == message.author.id; };
        const results = await embedmessage.awaitReactions(filter,{time:timelim})
        .then(collected =>{
            const reaction = collected.first();
            if(reaction.emoji.name === emojis.yes){
                yes+=1;
            }
            else if (reaction.emoji.name === emojis.no){
                no+=1;
            }
            else{
                console.log("no votes");
            }
        }).catch(() =>{
            console.log('no reactions recorded');
        });

        
        //pollEmbed.delete(0);
        
        }).catch(()=>{
            console.log('operation failed, mission abort');
        });    
        let resultsEmbed = new Discord.MessageEmbed()
        .setTitle("Poll Results")
        .setColor("#28EB28")
        .setDescription(`Results for the poll "${msgArgs}"`)
        .addField("👍:", `${yes} Votes`)
        .addField("👎:", `${no} Votes`)
        .setTimestamp()
        .setFooter(message.author.username);

        message.channel.send(resultsEmbed);
        

        
    }

}