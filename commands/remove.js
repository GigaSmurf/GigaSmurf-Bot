var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "remove",
    description: "Removes a user from the scrims",
    async execute(message,args){
        // Gets the player name 
        let player = "";
      if(!args[1]){
         player = `<@!${message.author.id}>`;
      }
      else{
        player = args[1];
      }


      const snapshot1 = await db.collection('scrims').where('name', '==', message.guild.name).get()
      //  Checks if the server already created a document,
      if(snapshot1.empty){
          
        message.channel.send("The scrims has not been started yet for this server!");
        
    }

    // Removes the player 
    const updater = db.collection('scrims').doc(message.guild.name);
      
      updater.update({
        Teams: FieldValue.arrayRemove(player)
      });
      
        message.channel.send(`${player} has been removed from the scrims`)
    }
}