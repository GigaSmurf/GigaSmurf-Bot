var admin = require("firebase-admin");
const db = admin.firestore();
const { FieldValue } = require('@google-cloud/firestore');

module.exports ={
    name: "moviepoll",
    description: "Creates a movie poll with the top 10 movies and moves that movie into the viewed list",
    async execute(message,args){
        let time1 = args[1];
        let regex1 = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
        if(regex1.test(time1)) {
            if(time1.toLowerCase().endsWith('s')) {
                time1 = parseInt(time1.substring(0, time1.indexOf('s')));
                time1 *= 1000;
            } 
            else if(time1.toLowerCase().endsWith('m')) {
                time1 = parseInt(time1.substring(0, time1.indexOf('m')));
                time1 *= 60 * 1000;
            }

            //unviewed list embed
            let unarrray1 = [];
           let arrlength9 = 0;
          await db.collection('servers').where('name', '==', message.guild.name).get().then((snapshot) => {
          snapshot.docs.forEach(doc =>{
          unarrray1 = doc.data().unviewed;
          arrlength9 = unarrray1.length;
          })
         })
        let stringcheese9 = "";
    
        for(var i =0; i < arrlength9; i++){
        stringcheese9+= (i+1) +". **"+unarrray1[i]+"**\n";
        }
        if(unarrray1.length == 0){
          stringcheese9 = "Type ``-add {movie}`` to add your watched movies to the unviewed list!";
        }
        if(arrlength9 == 1){
          message.channel.send("Need at least 2 movies to vote on dude!");
        }
      
          const Embeding6 = new Discord.MessageEmbed()
            .setColor("#00FEC1")
          .setTitle('Movie Poll')
          .setDescription(stringcheese9);

            try {
                const polls = new Map();
                const userVotes = new Map();
                let filter = (reaction, user) => {
                    if(user.bot) return false;
                    if(["1️⃣", "2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"].includes(reaction.emoji.name)) {
                        if(polls.get(reaction.message.id).get(user.id))
                            return false;
                        else {
                            userVotes.set(user.id, reaction.emoji.name);
                            return true;
                        }
                    }
                }
                let msg = await message.channel.send(Embeding6);
                if(arrlength9 >= 2){
                  await msg.react("1️⃣");
                  await msg.react("2️⃣");
                }
                if(arrlength9 >= 3){
                  await msg.react("3️⃣");
                }
                if(arrlength9 >= 4){
                  await msg.react("4️⃣");
                }
                if(arrlength9 >= 5){
                  await msg.react("5️⃣");
                }
                if(arrlength9 >= 6){
                  await msg.react("6️⃣");
                }
                if(arrlength9 >= 7){
                  await msg.react("7️⃣");
                }
                if(arrlength9 >= 8){
                  await msg.react("8️⃣");
                }
                if(arrlength9 >= 9){
                  await msg.react("9️⃣");
                }
                if(arrlength9 >= 10){
                  await msg.react("🔟");
                }

                polls.set(msg.id, userVotes);
                let reactions = await msg.awaitReactions(filter, { time: time1 });
                let one = reactions.get("1️⃣");
                let two = reactions.get("2️⃣");
                let three = reactions.get("3️⃣");
                let four = reactions.get("4️⃣");
                let five = reactions.get("5️⃣");
                let six = reactions.get("6️⃣");
                let seven = reactions.get("7️⃣");
                let eight = reactions.get("8️⃣");
                let nine = reactions.get("9️⃣");
                let ten = reactions.get("🔟");
                
                let one1 = 0, two2 = 0, three3 = 0, four4 =0, five5 = 0, six6 = 0, seven7 =0,eight8 =0,nine9 =0, ten10 = 0;
                if(one)
                  one1 = one.users.cache.filter(u => !u.bot).size;
                if(two)
                  two2 = two.users.cache.filter(u => !u.bot).size;
                if(three)
                  three3 = three.users.cache.filter(u => !u.bot).size;
                if(four)
                  four4 = four.users.cache.filter(u => !u.bot).size;
                if(five)
                  five5 = five.users.cache.filter(u => !u.bot).size;
                if(six)
                  six6 = six.users.cache.filter(u => !u.bot).size;
                if(seven)
                  seven7 = seven.users.cache.filter(u => !u.bot).size;
                if(eight)
                  eight8 = eight.users.cache.filter(u => !u.bot).size;
                if(nine)
                  nine9 = nine.users.cache.filter(u => !u.bot).size;
                if(ten)
                  ten10 = ten.users.cache.filter(u => !u.bot).size;  
                
                let maxarr = [one1,two2,three3,four4,five5,six6,seven7,eight8,nine9,ten10];
                let maxindex = 0;
                let maxnum = 0;
                for(var i =0; i< arrlength9;i++){
                  if(maxarr[i] > maxnum){
                    maxnum = maxarr[i];
                    maxindex = i;
                  }
                }
                const resultsEmbed1 = new Discord.MessageEmbed()
                    .setColor("#00FEC1")
                    .setTitle('Movie Poll Results')
                    .setDescription(`We are watching **${unarrray1[maxindex]}**!`)
                    .setFooter(`${maxnum} people voted for this movie`)
                    .setTimestamp();

                await message.channel.send(resultsEmbed1);

                const updater99 = db.collection('servers').doc(message.guild.name);
      
                  updater99.update({
                    viewed: FieldValue.arrayUnion(unarrray1[maxindex]),
                    unviewed: FieldValue.arrayRemove(unarrray1[maxindex])
                  });

            }
            catch(err) {
                console.log(err);
            }
        }
    }
}