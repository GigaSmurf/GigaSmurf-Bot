var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');

module.exports ={
    name: "delete",
    description: "Deletes a movie from the unviewed list",
    execute(message,args){
        let delmovie = args.slice(1).join(" ");
      const snapshot2 = await db.collection('servers').where('name', '==', message.guild.name).get()
      if(snapshot2.empty){
        message.channel.send("There are no movies added yet my friend...")
      }
      else{
        const updater1 = db.collection('servers').doc(message.guild.name);

        updater1.update({
          unviewed: FieldValue.arrayRemove(delmovie)
        });
        message.channel.send(`${delmovie} has been deleted from the unviewed list.`);
      } 
    }
}