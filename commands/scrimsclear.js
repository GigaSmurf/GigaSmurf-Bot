var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');
const Discord = require('discord.js');

module.exports ={
    name: "scrimsclear",
    description: "Clears the scrims",
    async execute(message,args){

        const updater = db.collection('scrims').doc(message.guild.name);

        updater.update({
            Teams:[],
            status: 0,
            gametype: ""
        });

        message.channel.send("The scrims have been cleared");
    }
}