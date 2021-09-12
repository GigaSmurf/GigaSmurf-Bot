const Discord = require('discord.js');
const https = require('https');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'champion',
    description: 'This shows the detailed information of one champion',
        execute(message,args){
        const url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
        let url1 = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/"
        const championname = args[1];
        let body = "";
        https.get(url,(res) =>{

            res.on('data', (chunk)=>{
                body+=chunk;
            });

             res.on("end",()=>{
                try{
                    let realname = "";
                    let id = -1;
                    let alias = "";
                    let bio = "";
                    //tactical info
                    let difficulty = "";
                    // playstyle info
                    let damage = ""
                    let durability = ""
                    let crowdcontrol = ""
                    let mobility = ""
                    let utility = ""
                    let photo = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/`
                    //role
                    let roles = "";
                    //skins
                    let skins = "";
                    //passive
                    let passivename = "";
                    let passivedesc = "";
                    // q
                    let qname = "";
                    let qdesc = "";
                    let qdynamicdesc = "";
                    // w
                    let wname = "";
                    let wdesc = "";
                    let wdynamicdesc = "";
                    // e
                    let ename = "";
                    let edesc = "";
                    let edynamicdesc = "";
                    // r
                    let rname = "";
                    let rdesc = "";
                    let rdynamicdesc = "" ;

                    let  qrange = []
                    let  qcosts = []
                    let  qcooldown = []

                    let  wrange = []
                    let  wcosts = []
                    let  wcooldown = []

                    let  erange = []
                    let  ecosts = []
                    let  ecooldown = []

                    let  rrange = []
                    let  rcosts = []
                    let  rcooldown = []

                    async function getData(){

                                
                        //turns json data into json object
                        let json = await JSON.parse(body);
                        for(var key of Object.keys(json)){
                            if(json[key].name.toLowerCase() == championname.toLowerCase()){

                                // for(var key1 of Object.keys(json1)){
                                 id = json[key].id;
                                url1 += `${id}.json`;

                                let body1 = "";
                                https.get(url1,(res) =>{

                                    res.on('data', (chunk)=>{
                                        body1+=chunk;
                                    });

                                    res.on("end",()=>{
                                        try{


                                        async function getData1(){
                                            //turns json data into json object
                                            let json1 = await JSON.parse(body1);

                                            realname = json1.name;
                                            alias = json1.title;
                                            bio = json1.shortBio;

                                            difficulty = json1.tacticalInfo.difficulty;
                                            damage = json1.playstyleInfo.damage;
                                            durability = json1.playstyleInfo.durability;
                                            crowdcontrol = json1.playstyleInfo.crowdControl;
                                            mobility = json1.playstyleInfo.mobility;
                                            utility = json1.playstyleInfo.utility;
                                            

                                            photo += `${json1.id}.png`;
                                            roles = json1.roles;
                                            for(var key1 of Object.keys(json1.skins)){
                                                if(!key1 == 0){
                                                    
                                                skins+= `${json1.skins[key1].name}, `;
                                                }
                                               
                                            }
                                            passivename = json1.passive.name;
                                            passivedesc = json1.passive.description;

                                            qname = json1.spells[0].name;
                                            qdesc = json1.spells[0].description;
                                            qdynamicdesc = json1.spells[0].dynamicDescription;
                                            qrange = json1.spells[0].range;
                                            qcosts = json1.spells[0].costCoefficients;
                                            qcooldown = json1.spells[0].cooldownCoefficients;

                                            wname = json1.spells[1].name;
                                            wdesc = json1.spells[1].description;
                                            wdynamicdesc = json1.spells[1].dynamicDescription;
                                            wrange = json1.spells[1].range;
                                            wcosts = json1.spells[1].costCoefficients;
                                            wcooldown = json1.spells[1].cooldownCoefficients;

                                            ename = json1.spells[2].name;
                                            edesc = json1.spells[2].description;
                                            edynamicdesc = json1.spells[2].dynamicDescription;
                                            erange = json1.spells[2].range;
                                            ecosts = json1.spells[2].costCoefficients;
                                             ecooldown = json1.spells[2].cooldownCoefficients;

                                            rname = json1.spells[3].name;
                                            rdesc = json1.spells[3].description;
                                            rdynamicdesc = json1.spells[3].dynamicDescription;
                                             rrange = json1.spells[3].range;
                                             rcosts = json1.spells[3].costCoefficients;
                                             rcooldown = json1.spells[3].cooldownCoefficients;
                                        


                                            


                                        }
                                        
                                        async function waitforTHIS(){

                                            await getData1();
                                            const exampleEmbed = new Discord.MessageEmbed()
                                                .setColor('GOLD')
                                                .setTitle(`${realname}`)
                                                .setURL(`https://leagueoflegends.fandom.com/wiki/${realname}/LoL`)
                                                // .setAuthor(`Page ${args[1]}`, 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_120,h_120/https://dashboard.snapcraft.io/site_media/appmedia/2018/09/icon_schOjzl.png')
                                                .setDescription(`**${alias}** \n\n ${bio} \n\n **Role(s):** ${roles}`)
                                                .addFields(
                                                    { name: 'Difficulty', value: `${difficulty}`, inline: true },
                                                    { name: 'Damage', value: `${damage}`, inline: true },
                                                    { name: 'Durability', value: `${durability}`, inline: true },

                                                    { name: 'Crowd Control', value: `${crowdcontrol}`, inline: true },
                                                    { name: 'Mobility', value: `${mobility}`, inline: true },
                                                    { name: 'Utility', value: `${utility}`, inline: true },

                                                    { name: 'Passive', value: `${passivename} - ${passivedesc}`, inline: false },

                                                    { name: 'q', value: `${qname}`, inline: true },
                                                    { name: 'Description', value: `${qdesc}`, inline: true },
                                                    { name: 'Values', value: `**Range:** ${qrange} \n **Costs:** ${qcosts} \n **Cooldown:** ${qcooldown}`, inline: true },

                                                    { name: 'w', value: `${wname}`, inline: true },
                                                    { name: 'Description', value: `${wdesc}`, inline: true },
                                                    { name: 'Values', value: `**Range:** ${wrange} \n **Costs:** ${wcosts} \n **Cooldown:** ${wcooldown}`, inline: true },

                                                    { name: 'e', value: `${ename}`, inline: true },
                                                    { name: 'Description', value: `${edesc}`, inline: true },
                                                    { name: 'Values', value: `**Range:** ${erange} \n **Costs:** ${ecosts} \n **Cooldown:** ${ecooldown}`, inline: true },

                                                    { name: 'r', value: `${rname}`, inline: true },
                                                    { name: 'Description', value: `${rdesc}`, inline: true },
                                                    { name: 'Values', value: `**Range:** ${rrange} \n **Costs:** ${rcosts} \n **Cooldown:** ${rcooldown}`, inline: true },

                                                     { name: '\u200B', value: '\u200B' },
                                                    { name: 'Skins ', value: `${skins}` },
                                                    
                                                )
                                                // .addField('Inline field title', 'Some value here', true)
                                                .setThumbnail(photo)
                                                .setTimestamp()
                                                .setFooter('Patch: latest', 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_120,h_120/https://dashboard.snapcraft.io/site_media/appmedia/2018/09/icon_schOjzl.png');
                                             message.channel.send(exampleEmbed);
                                        }
                                        try {
                                            waitforTHIS();}
                                            catch(error){
                                                console.error(error.message);
                                            }

                                    }
                                        catch (error){
                                            console.error(error.message);
                                        }

                                    });
                                })


                            // }
                            }

                        }





            }
            async function waitforTHIS1(){

                await getData();
            }
            
            try {
                waitforTHIS1();
            }
                catch(error){
                    console.error(error.message);
                }

        }//try ends
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