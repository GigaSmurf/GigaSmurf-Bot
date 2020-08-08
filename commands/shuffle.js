var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "shuffle",
    description: "Shuffles up the teams",
    async execute(message,args){

      // retrieving the data on the teams 
    let players = [];
    let name = "";
    await db.collection('scrims').where('name', '==', message.guild.name).get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        players = doc.data().Teams;
        name = doc.data().gametype; 
    })
    })  
    
    
    
    //shuffled using the fisher-yates shuffle algorithm
       
    var swap, rand; 
  
    for (let index = players.length-1; index > 0; index--) {
      
      rand = Math.floor(Math.random() * index);
  
      swap = players[index];
      players[index] = players[rand];
      players[rand] = swap; 
     }


    message.channel.send("Players were shuffled");
    
    // Updates the shuffled teams to the database
    const updater = db.collection('scrims').doc(message.guild.name);
      
      updater.update({
        Teams: players
      });


    //   Displays the teams
        const gameEmbed = new Discord.MessageEmbed()
        .setColor('#0357FD')
        .setTitle(`${name} Scrims`)
        .setDescription('-shuffle to shuffle the teams')
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