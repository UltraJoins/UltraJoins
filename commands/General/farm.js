const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../emoji.json');

module.exports = {
  name: "farm",
  description: "servers",
  aliases: ["search"],
  execute: async(client, message, args, data, db) => {
  
  
  var server = client.guilds.cache.get(`${message.guild.id}`);
if(server != `${config.serverid}`) {
  message.channel.send('UltraJoin bot commands are **forbidden to use** in other servers, Please **join our support server** to execute UltraJoin bot commands !\n\n`Link:` https://discord.gg/ultrajoins')
  } else {
   
    let orders = await db.startsWith(`orders_`, { sort: ".data" })
    
    let length = 2
    
    orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(message.author.id) === undefined)
    
    const countdownEmbed2 = new Discord.MessageEmbed()
     .setColor('#2f3136')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
     .setDescription('The bot is searching for servers, Please wait `3 seconds` to farm!\n\n*Thank you for using the bot to expand your server!*')
      .setImage("https://images-ext-2.discordapp.net/external/09m3TSBnu6mhLIUTb3zghpGk6Y1EWrR_Vx6dztb6E1Y/https/images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")

    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor('UltraJoins', client.user.displayAvatarURL())
    
    .setDescription(`Join one of the servers below \`⬇️\` to earn \`1\` coin. \n\n`)
    .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
    for (let i = 0;i < orders.length;i++) {
     
      let handler = true
      
     if (length > 11) {} else {

       let id = orders[i].ID.split("_")[1]
     
       let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name
     
        let code = await db.fetch(`code_${id}`)
     
       
        await client.fetchInvite("https://discord.gg/" + code)
       .then(link => { 
        console.log(`[+farm] ->Invitation link: discord.gg/` + link.code)
         if (link.code === null) handler = false 
       })
       .catch(error => {
         handler = false 
       }) 
       
       await new Promise(resolve => setTimeout(resolve, 1))
       
       if (handler) {
         let description = await db.fetch(`description_${id}`)
         embed.addField(`\`${guild}\``,  description, false)
          length++
     } 
   } 
 } 

 
    
    embed.addField(`${emoji.popo} Seeing more servers?`, `Join our support server to get more [coins](${config.supportServer})`, false)

    
    
    message.channel.send({content: '⚠️ Remember not to leave the server for **2 days** otherwise you are sure to lose **2 coins**! ⚠️', embed: countdownEmbed2}).then((msg) => {
      setTimeout(function () {
          msg.edit(embed);
      }, 3000)
  })
  } 
}

}