const Discord = require('discord.js')
const ms = require('parse-ms') 
const config = require('../../config.json');
module.exports = {
  name: "check",
  description: "time",
  execute: async(client, message, args, data, db) => {
   
    let timeout = 259200000
    
    let time = []
    
    if (data.joinedDate !== null && timeout - (Date.now() - data.joinedDate) > 999) {
      Object.entries(ms(timeout - (Date.now() - data.joinedDate))).map((x, y) => {
        if (x[1] > 0 && y < 4) time.push(`**${x[1]} ${x[0]}**`)      })
      

      const noembed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      
      .setDescription(`You will lose \`2\` coins if you leave now!`)
      .addField(`Remaining time:`, time.join(", "), false)
      .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
      message.channel.send(noembed)   
     } else {
      const embed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      
      .setDescription(`⭐️ Hello ${message.author.username}, You are now allowed to leave this server and won't lose any coins`)
      message.channel.send(embed) 
    } 
  } 
}