const Discord = require('discord.js');
const fs = require('fs');
const puppetteer = require('puppeteer');
const chromium = require('chromium');

module.exports = {
  name: 'live',
  description: "This displays the players live match",
  async execute(message, args) {
    let fullArgument = args.slice(1).join(" ");
    let [name, tag] = fullArgument.split("#");
    let display = `${name}#${tag}`;
    // Encode spaces for URL
    let encodedName = encodeURIComponent(name);

    message.channel.startTyping();
    let person = message.author.id;
    const browser = await puppetteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    try {

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      // const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
      //w 1920, h 1200 
      await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
      await page.goto(`https://www.op.gg/summoners/na/${encodedName}-${tag}`);


      // await page.waitForSelector('.SpectateTabButton');

      // const button = await page.$('.SpectateTabButton');
      // button.click();
      // await navigationPromise;

      //   await page.waitForSelector('.SpectateSummoner');
      // //   console.log("Loading Success");

      //   const shot = await page.$('.SpectateSummoner')

      await page.waitForSelector('.LiveGamePreview.css-12xhu0w.e67ftu0 .contents', { timeout: 7000 });
      const shot = await page.$('.LiveGamePreview.css-12xhu0w.e67ftu0 .contents');

      const box = await shot.boundingBox();

      const x1 = box.x;                                // coordinate x
      const y1 = box.y;                                // coordinate y
      const w1 = box.width;                            // area width
      const h1 = box.height;                           // area height
      // console.log(`${x1}, ${y1}, ${w1}, ${h1}`);
      //   Takes screenshot path.join(__dirname, `../static/images/${id}.png`)   path.join(__dirname, 'file.json')
      const imagebuffer = await page.screenshot({ clip: { x: x1, y: y1, width: w1, height: h1 }, omitBackground: true });

      // await page.screenshot({'path': 'images/esports.png', 'clip': {'x': x, 'y': y, 'width': w, 'height': h}});  
      // console.log("screenshot taken");
      //   Embed
      const liveshot = new Discord.MessageEmbed()
        .setColor('#5383e9')
        .setTitle(`${display}'s Live Game`)
        .setURL(`https://www.op.gg/summoners/na/${encodedName}-${tag}/ingame`)
        .setDescription("")
        .attachFiles([{ name: `${person}.png`, attachment: imagebuffer }])
        .setImage(`attachment://${person}.png`);

      await message.channel.send(liveshot);

      //  await message.channel.send(`Here is the summoner ${display}`, {files: ["../images/esports.png"]});
      // console.log("Embed works");
      // Closes the browser
      await browser.close();
    }
    //   Catch Error
    catch (e) {
      console.log('This error: ', e)
      message.channel.send("This player is currently not in a game.");
      await browser.close();
    }
    message.channel.stopTyping();

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