var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "watch",
    description: "Moves a movie from the unviewed list to the viewed list",
    async execute(message,args){
        const snapshot7 = await db.collection('servers').where('name', '==', message.guild.name).get()
      let watched = args.slice(1).join(" ");
      if(snapshot7.empty){
          db.collection('servers').doc(message.guild.name).set({
            name: message.guild.name,
            viewed: [watched],
            unviewed: []
          });
          
      }
      else{
      
      const updater1 = db.collection('servers').doc(message.guild.name);
      
      updater1.update({
        viewed: FieldValue.arrayUnion(watched),
        unviewed: FieldValue.arrayRemove(watched)
      });
    }
    message.channel.send(`${watched} has been added to the viewed list.`);
    }
}