var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "match",
    description: "Adds the team name to the match room",
    async execute(message,args){
        
        let matchroom = args.slice(6).join(" ");
        let teamname = message.guild.name;

        // 0 = command, 1 = matchroom, 2 = players  

        const snapshot1 = await db.collection('scrims').where('name', '==', matchroom).get()
                
        if(snapshot1.empty){
                    message.channel.send("This match does not exist.");
                    return;
        }  

        if(!args.length>=7){
            message.channel.send("Please make sure you have added all 5 of your players or check -help for more information.");

        }

        const updater = db.collection('scrims').doc(matchroom);
        // Adds the team members to the list
            for(var i = 1; i<6; i++){
    
                await updater.update({
                    Teams: FieldValue.arrayUnion(args[i])
                })
            }

         // retrieving the data on the teams 
        let status = 0;
         await db.collection('scrims').where('name', '==', matchroom).get().then((snapshot) => {
         snapshot.docs.forEach(doc =>{
             status = doc.data().number;
         })
        })

        //  Adds the team name
            
         if(status==0){
            await updater.update({
                Team1: matchroom 
            });
         }
         else{
            await updater.update({
                Team2: matchroom 
            });
         }
            
         message.channel.send(`The team ${teamname} is now in the match room ${matchroom}. Type -show {matchroom} to check the teams.`)

    }
 

}