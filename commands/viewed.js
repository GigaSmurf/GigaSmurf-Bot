var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');
module.exports ={
    name: "viewed",
    description: "Displays the viewed list",
    async execute(message,args){
        let arrray = [];
        let arrlength1 = 0;
        await db.collection('servers').where('name', '==', message.guild.id).get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
            arrray = doc.data().viewed;
            arrlength1 = arrray.length;
          })
        })
        let stringcheese1 = "";
      
        for(var i =0; i < arrlength1; i++){
          stringcheese1+= (i+1) +". **"+arrray[i]+"**\n";
        }
        if(arrray.length == 0){
          stringcheese1 = "Type ``-watch {movie}`` to add your watched movies to the viewed list!";
        }
        const Embeding1 = new Discord.MessageEmbed()
        .setColor("#00FEC1")
        .setTitle('Viewed List')
        .setDescription(stringcheese1);
        message.channel.send(Embeding1); 
    }
}