var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "show",
    description: "Shows the teams for this match room",
    async execute(message,args){
        
        let matchroom = args.slice(1).join(" ");


        const snapshot1 = await db.collection('scrims').where('name', '==', matchroom).get()
                
        if(snapshot1.empty){
                    message.channel.send("This match does not exist.");
            }     
        else{  
        // retrieving the data on the teams 
        let players = [];
        let name = "";
        await db.collection('scrims').where('name', '==', matchroom).get().then((snapshot) => {
        snapshot.docs.forEach(doc =>{
            players = doc.data().Teams;
            name = doc.data().gametype; 
        })
        })
        for(var i = players.length; i<10 ; i++){
            players.push(`Missing Player ${i+1}`);
        }



    const gameEmbed = new Discord.MessageEmbed()
      .setColor('#0357FD')
      .setTitle(`${name} Scrims`)
      .setDescription('-win {match roomname} {team name} for the winners to gain some elo!')
      .addFields(
        {name: 'Team 1', value: `${players[0]}`,  inline: true},
        { name: '\u200B', value: '\u200B', inline:true },
        { name: 'Team 2', value:`${players[5]}`, inline: true}, 

        {name: '\u200B', value: `${players[1]}`,  inline: true},
        { name: '\u200B', value: '\u200B', inline:true },
        { name: '\u200B', value:`${players[6]}`, inline: true}, 

        {name: '\u200B', value: `${players[2]}`,  inline: true},
        { name: '\u200B', value: '\u200B', inline:true },
        { name: '\u200B', value:`${players[7]}`, inline: true},

        {name: '\u200B', value: `${players[3]}`,  inline: true},
        { name: '\u200B', value: '\u200B', inline:true },
        { name: '\u200B', value:`${players[8]}`, inline: true},

        {name: '\u200B', value: `${players[4]}`,  inline: true},
        { name: '\u200B', value: '\u200B', inline:true },
        { name: '\u200B', value:`${players[9]}`, inline: true},    
      )
      .setTimestamp(new Date())
      .setFooter('Good Luck Summoners!');
      
    message.channel.send(gameEmbed);
     }            
    }
}  