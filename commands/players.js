var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "players",
    description: "Gets the list of players",
    async execute(message,args){




        // retrieving the data on the teams 
        let players = [];
        let arrlength = 0;
        await db.collection('scrims').where('name', '==', message.guild.name).get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
            players = doc.data().Teams;
            arrlength = players.length;
          })
        })

        let stringcheese = "";
      
        for(var i =0; i < arrlength; i++){
          stringcheese+= "**"+players[i]+"**, ";
        }

        if(players.length == 0){
          stringcheese = "Type ``-join`` to join the scrims";
        }





        // Embed message of the amount of players and the list of players in the scrims
        const Embeding = new Discord.MessageEmbed()
        .setColor('#0357FD')
        .setTitle('Players List')
        .setDescription(stringcheese)
        .addField('Total Players: ', arrlength, true);
        
        message.channel.send(Embeding); 
    }
}