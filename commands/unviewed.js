var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');


module.exports ={
    name: "unviewed",
    description: "Displays the unviewed list",
    async execute(message,args){
        let unarrray = [];
        let arrlength = 0;
        await db.collection('servers').where('name', '==', message.guild.name).get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
            unarrray = doc.data().unviewed;
            arrlength = unarrray.length;
          })
        })
        let stringcheese = "";
      
        for(var i =0; i < arrlength; i++){
          stringcheese+= (i+1) +". **"+unarrray[i]+"**\n";
        }
        if(unarrray.length == 0){
          stringcheese = "Type ``-add {movie}`` to add your watched movies to the unviewed list!";
        }
        const Embeding = new Discord.MessageEmbed()
        .setColor("#00FEC1")
        .setTitle('Unviewed List')
        .setDescription(stringcheese);
        message.channel.send(Embeding); 
    }
}