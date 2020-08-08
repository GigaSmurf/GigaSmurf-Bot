var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "join",
    description: "Initiates the scrims if not already initiated and adds user to the scrims",
    async execute(message,args){

    // Gets the player name 
        let player = "";
      if(!args[1]){
         player = message.author;
      }
      else{
        player = args[1];
      }


      const snapshot1 = await db.collection('scrims').where('name', '==', message.guild.name).get()
      //  Checks if the server already created a document, if not then starts the scrims and creates the document
      if(snapshot1.empty){
          
        db.collection('scrims').doc(message.guild.name).set({
          name: message.guild.name,
          Teams: [player] ,
          status: 1,
          gametype: ""
        });
        
    }

    // Adds the player 
    const updater = db.collection('scrims').doc(message.guild.name);
      
      updater.update({
        Teams: FieldValue.arrayUnion(player)
      });
      
        message.channel.send(`${player} has joined the scrims`);
    
    }  
}
