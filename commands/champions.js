const Discord = require('discord.js');
const https = require('https');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'champions',
    description: 'This shows the list of champions in league of legends',
       async execute(message,args){
        if (!args[1]== '1' || !args[1]== '2' ||!args[1]== '3'){
            message.channel.send("Please specify a page number.")
            return;
        }
        const url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
        let body = "";
        https.get(url,(res) =>{

            res.on('data', (chunk)=>{
                body+=chunk;
            });

             res.on("end",()=>{
                try{
                    let list = "";
                    async function getData(){
                        //turns json data into json object
                        let json = await JSON.parse(body);
                        for(var key of Object.keys(json)){
                            let emoji ="";
                            if(args[1] == "1"){
                                if(key != 0 && key < 10){
                            
                                    emoji = await message.client.emojis.cache.find(emoji => emoji.name === `${json[key].id}_`);
                                    list+=`${emoji} ${json[key].name}   \n`
                                    }
                                
                                    if(key >= 10){
                                        emoji = await message.client.emojis.cache.find(emoji => emoji.name === `${json[key].id}`);
                                        let spaces = "   ";
                                    list+=`${emoji} ${json[key].name}   \n`
                                    }

                                    if(key == 53){
                                        break;
                                    }
                            }
                            else if(args[1] == "2"){
                                if(key!=0){
                                    if(key >=54){
                                emoji = await message.client.emojis.cache.find(emoji => emoji.name === `${json[key].id}`);
                                    list+=`${emoji} ${json[key].name}   \n`
                                    }
                                    if(key == 106){
                                        break;
                                    }
                                }
                                
                            }
                            else{
                                if(key >=107){
                                emoji = await message.client.emojis.cache.find(emoji => emoji.name === `${json[key].id}`);
                                    list+=`${emoji} ${json[key].name}   \n`
                                }
                            }
                            
                        }
                        const exampleEmbed = new MessageEmbed()
                            .setColor('DARK_BLUE')
                            .setTitle('Champions List')
                            .setURL('https://www.leagueoflegends.com/en-us/champions/')
                            .setAuthor(`Page ${args[1]}`)
                            .setDescription(list)
                            .setThumbnail('https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1.png')
                            .setTimestamp()
                            .setFooter('Patch: latest', 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_120,h_120/https://dashboard.snapcraft.io/site_media/appmedia/2018/09/icon_schOjzl.png');
                        console.log(list);
                        message.channel.send({ embeds: [exampleEmbed] });
                        
                    }
                    try {
                        getData();}
                        catch(error){
                            console.error(error.message);
                        }
                }
                catch (error){
                    console.error(error.message);
                }
            });


        }).on('error', (error) =>{
            console.error(error.message);
        });
        // console.log(jsonobj,"wtf");  doesnt work here because async await 
    }
}