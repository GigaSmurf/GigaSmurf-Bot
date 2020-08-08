var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "win",
    description: "Deletes the Matchroom, and adding elo to the winning team",
    async execute(message,args){
        let winning = args[2];

        // local server win
        if(!args[2]){
            let winning1= args[1];
            message.channel.send(`Team ${winning1} has won the scrims.`);
        }

        // for cross server win
        else{

        
        let gamename = "Game " + args[1];
        
        const document = db.collection('scrims').doc(gamename);

        await document.update({
            Team1: FieldValue.delete(),
            Team2: FieldValue.delete(),
            Teams: FieldValue.delete(),
            gametype: FieldValue.delete(),
            name: FieldValue.delete()
        })

        await document.delete();
        message.channel.send(`${winning} has won the scrims. This match room will now be closing.`);
        } 
        
       
    }
}  