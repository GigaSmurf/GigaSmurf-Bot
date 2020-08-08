var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "create",
    description: "Creates an online scrims",
    async execute(message,args){
        
    let roomname = args[1];
      let gametype1 = args.slice(2).join(" ");

        // creates the matchroom
        db.collection('scrims').doc(roomname).set({
            name: roomname,
            Teams: [],
            gametype: gametype1,
            Team1: "Team 1",
            Team2: "Team 2"
          });

        message.channel.send(`The scrims match was created in "${roomname}".`);
                
    }
}  