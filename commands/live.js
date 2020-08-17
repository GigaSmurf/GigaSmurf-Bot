const Discord = require('discord.js');
const fs = require('fs');
const puppetteer = require('puppeteer');
const chromium = require('chromium');

module.exports = {
    name: 'live',
    description: "This displays the players live match",
    async execute(message, args){
      let name1 = args.slice(1).join("+");
      let display = args.slice(1).join(" ");
        let person = message.author.id;
      try{
        const browser = await puppetteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        });
          const page = await browser.newPage();
          await page.setDefaultNavigationTimeout(0);
          // const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
        //w 1920, h 1200 
        await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
          await page.goto(`https://na.op.gg/summoner/userName=${name1}`);
        
          
            await page.waitForSelector('.SpectateTabButton');
        
            const button = await page.$('.SpectateTabButton');
            button.click();
          // await navigationPromise;
          
          await page.waitForSelector('.SpectateSummoner');
        //   console.log("Loading Success");
        
          const shot = await page.$('.SpectateSummoner')
          const box = await shot.boundingBox();
        
          const x1 = box.x;                                // coordinate x
          const y1 = box.y;                                // coordinate y
          const w1 = box.width;                            // area width
          const h1 = box.height;                           // area height
          // console.log(`${x1}, ${y1}, ${w1}, ${h1}`);
        //   Takes screenshot path.join(__dirname, `../static/images/${id}.png`)   path.join(__dirname, 'file.json')
          const imagebuffer =  await page.screenshot({ clip: {x: x1, y: y1, width: w1, height: h1}, omitBackground: true });

          // await page.screenshot({'path': 'images/esports.png', 'clip': {'x': x, 'y': y, 'width': w, 'height': h}});  
          // console.log("screenshot taken");
        //   Embed
          const liveshot = new Discord.MessageEmbed()
          .setColor('#5383e9')
          .setTitle(`${display}'s Live Game`)
          .setURL(`https://na.op.gg/summoner/userName=${name1}`)
          .setDescription("")
          .attachFiles([{name:`${person}.png`, attachment: imagebuffer}])
          .setImage(`attachment://${person}.png`);
    
          await message.channel.send(liveshot);

        //  await message.channel.send(`Here is the summoner ${display}`, {files: ["../images/esports.png"]});
        // console.log("Embed works");
        // Closes the browser
          await browser.close();

          }
        //   Catch Error
          catch(e){
            console.log('This error: ', e)
            message.channel.send("This player is currently not in a game.");
          }

        //   Deletes Image after try catch in case error after saving the image
        //     const path = `../images/${person}.png`;

        // fs.unlink(path, (err) => {
        //   if (err) {
        //     console.error(err)
        //     return
        //   }
        
        //   //file removed
        // })
    }
}