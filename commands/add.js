var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');


module.exports ={
    name: "add",
    description: "Adds a movie to the unviewed list",
    async execute(message,args){
        const snapshot1 = await db.collection('servers').where('name', '==', message.guild.name).get()
      let addmovie = args.slice(1).join(" ");
      if(snapshot1.empty){
          db.collection('servers').doc(message.guild.name).set({
            name: message.guild.name,
            viewed: [],
            unviewed: [addmovie]
          });
          
      }
      else{
      
      const updater = db.collection('servers').doc(message.guild.name);
      
      updater.update({
        unviewed: FieldValue.arrayUnion(addmovie)
      });
    }
    message.channel.send(`${addmovie} has been added to the unviewed list`);
    }
}