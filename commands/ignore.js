var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "ignore",
    description: "Tells GigaSmurf to ignore invalid commmands",
    async execute(message,args){

      const snapshot1 = await db.collection('prefix').where('name', '==', message.guild.id).get()
      //  Checks if the server already created a document, if not then starts the scrims and creates the document
      if(snapshot1.empty){
          
        db.collection('prefix').doc(message.guild.id).set({
          name: message.guild.id,
        });

        message.channel.send(`GigaSmurf will now be ignoring invalid commands from the ${message.guild.name}`);
        
    }

    else{
        
        const document = db.collection('prefix').doc(message.guild.id);
        // Deletes the document
        await document.update({
            name: FieldValue.delete()
        })

        await document.delete();
        message.channel.send(`GigaSmurf will now be listening to invalid commands from the ${message.guild.name}`);
    }

    
    }  
}