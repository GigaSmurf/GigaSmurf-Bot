var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "scrims",
    description: "Initiates the scrims",
    async execute(message,args){
        
        let status1 = 0;
      let gametype1 = args.slice(1).join(" ");
      const snapshot1 = await db.collection('scrims').where('name', '==', message.guild.name).get()

      //  Checks if the server already created a document, if not then starts the scrims and creates the document 
      if(snapshot1.empty){
          
          db.collection('scrims').doc(message.guild.name).set({
            name: message.guild.name,
            Teams: [] ,
            status: 1,
            gametype: gametype1
          });
          
      }

      // if the server already has a document then, just get the status to see if the scrims already started 
      else{
        await db.collection('scrims').where('name', '==', message.guild.name).get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
            status1 = doc.data().status;
          })
        })
      }
        


      // second if else, checks to see if someone already started the scrims for the server 
      if(status1 !== 0){ message.channel.send("Someone already started the scrims!");}

      // if someone has not started the scrims yet then this runs
      else{
        const updater = db.collection('scrims').doc(message.guild.name);
      
      updater.update({
        status: 1
      });
      
        message.channel.send(`We are playing ${gametype1} scrims!`);
      }

        
    }
}  