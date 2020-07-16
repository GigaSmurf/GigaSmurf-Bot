const Discord = require('discord.js');
const emojis = require("../emojis.json");
module.exports = {
    name: 'poll',
    description: 'This command creates a yes or no poll to help make a decision',
    async execute(message, args){
        let time = args[1];
        let question = args.slice(2).join(" ");
        let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
        if(regex.test(time)) {
            if(time.toLowerCase().endsWith('s')) {
                time = parseInt(time.substring(0, time.indexOf('s')));
                time *= 1000;
            } 
            else if(time.toLowerCase().endsWith('m')) {
                time = parseInt(time.substring(0, time.indexOf('m')));
                time *= 60 * 1000;
            }
            const embed = new Discord.MessageEmbed()
                .setColor("#E73D07")
                .setTitle(question)
                .setDescription('React with 👍 or 👎')
                .setTimestamp();
            try {
                const polls = new Map();
                const userVotes = new Map();
                let filter = (reaction, user) => {
                    if(user.bot) return false;
                    if(['👍', '👎'].includes(reaction.emoji.name)) {
                        if(polls.get(reaction.message.id).get(user.id))
                            return false;
                        else {
                            userVotes.set(user.id, reaction.emoji.name);
                            return true;
                        }
                    }
                }
                let msg = await message.channel.send(embed);
                await msg.react('👍');
                await msg.react('👎');
                polls.set(msg.id, userVotes);
                let reactions = await msg.awaitReactions(filter, { time: time });
                let thumbsUp = reactions.get('👍');
                let thumbsDown = reactions.get('👎');
                let thumbsUpResults = 0, thumbsDownResults = 0;
                if(thumbsUp)
                    thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
                if(thumbsDown)
                    thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
                const resultsEmbed = new Discord.MessageEmbed()
                    .setColor("#28EB28")
                    .setTitle('Results')
                    .setFooter(message.author.username)
                    //.setDescription(`👍 - ${thumbsUpResults} votes\n\n👎 - ${thumbsDownResults} votes\n`);
                    .setDescription(`for the poll "${question}"`)
                    .setTimestamp()
                    .addField('👍',`${thumbsUpResults} Votes`,false)
                    .addField('👎',`${thumbsDownResults} Votes`,false);

                await message.channel.send(resultsEmbed);
            }
            catch(err) {
                console.log(err);
            }
        }

        
    }

}