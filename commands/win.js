var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "win",
    description: "Deletes the Matchroom, and adding elo to the winning team",
    async execute(message,args){
        

        // local server win
        if(!args[2]){
            let winning1= args[1];
            message.channel.send(`Team ${winning1} has won the scrims.`);
        }

        // for cross server win
        else{
                let winning = "";
                let side = args[1];
                let gamename =  args.slice(2).join(" ");
                
                const document = db.collection('scrims').doc(gamename);
                const snapshot1 = await db.collection('scrims').where('name', '==', gamename).get()
                
                if(snapshot1.empty){
                    message.channel.send("This match does not exist.");
                }
                else{
                    let Teama = "Team 1";
                    let Teamb = "Team 2";
                    await db.collection('scrims').where('name', '==', gamename).get().then((snapshot) => {
                        snapshot.docs.forEach(doc =>{
                          Teama = doc.data().Team1;
                          Teamb = doc.data().Team2;
                        })
                      })

                      if(side=="1"){
                        winning = Teama;
                      }
                      else{
                          winning = Teamb;
                      }

                    await document.update({
                        Team1: FieldValue.delete(),
                        Team2: FieldValue.delete(),
                        Teams: FieldValue.delete(),
                        gametype: FieldValue.delete(),
                        name: FieldValue.delete(),
                        number: FieldValue.delete()
                    })

                    await document.delete();
                    message.channel.send(`${winning} has won the scrims. This match room will now be closing.`);
                    } 
        }
       
    }
}  