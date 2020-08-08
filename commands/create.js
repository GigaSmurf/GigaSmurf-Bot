var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "create",
    description: "Creates an online scrims",
    async execute(message,args){
        
    let rooms = 0;
      let gametype1 = args.slice(1).join(" ");

        // retrieving the data of the amount of match rooms 
        await db.collection('scrims').where('name','==','games').get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
            rooms = doc.data().current;
          })
        }).catch((error) => 
        {console.log(error)});
    let roomnum = "Game "+rooms.toString();

        // creates the matchroom
        db.collection('scrims').doc(roomnum).set({
            name: roomnum,
            Teams: [],
            gametype: gametype1,
            Team1: "Team 1",
            Team2: "Team 2"
          });

        message.channel.send(`The scrims match was created in "Game ${rooms.toString}". The match number is ${rooms.toString}`);

        const updater = db.collection('scrims').doc("games");
          rooms++;
        updater.update({
          current: rooms
        });

    

        
    }
}  