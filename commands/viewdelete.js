var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "viewdelete",
    description: "Deletes a movie from the viewed list",
    async execute(message,args){
        let delmovie1 = args.slice(1).join(" ");
        const snapshot10 = await db.collection('servers').where('name', '==', message.guild.name).get()
        if(snapshot10.empty){
          message.channel.send("There are no movies added yet my friend...")
        }
        else{
          const updater10 = db.collection('servers').doc(message.guild.name);
  
          updater10.update({
            viewed: FieldValue.arrayRemove(delmovie1)
          });
          message.channel.send(`${delmovie1} has been deleted from the viewed list.`);
        }
    }
}