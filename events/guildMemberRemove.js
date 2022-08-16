const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json')
const emoji = require("../emoji.json")

module.exports = {
  execute: async(client, member, db) => {
   
    if (await db.fetch(`coins_${member.user.id}`) === null) return
    
    let data = await get(member, member.user)
    
    let time = Date.now() - member.user.createdTimestamp
    
    if (time < 300) {
		 return 
    } 
    
    if (data.code == 0) return
    
    let link = await client.fetchInvite(`https://discord.gg/${data.code}`)
    
    if (link === undefined) return
      
    //if (data.record.includes(member.user.id)) return
    
    if (data.joinedDate == 0) return
    
    let timeout = 259200000
      
    if (data.joinedDate === null || timeout - (Date.now() - data.joinedDate) < 1) {
        
      data.users.filter(x => x !== member.user.id)
        
      db.set(`users_${member.guild.id}`, data.users)
        
      db.set(`joinedDate_${member.guild.id}_${member.user.id}`, 0)
        
      return 
      } 
      
      db.subtract(`coins_${member.user.id}`, 2)
      
      data.logs.unshift(`[-2] - You left a server before the 2 day deadline.`)
      
      db.set(`logs_${member.user.id}`, data.logs)
      
      data.users = data.users.filter(x => x !== member.user.id)
      
      db.set(`users_${member.guild.id}`, data.users)
      
      db.set(`joinedDate_${member.guild.id}_${member.user.id}`, 0) 

      let channel = client.channels.cache.get(`${config.userLeft}`)
      
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setColor(`#2f3136`)
    .setDescription(`${emoji.info} <@${member.user.id}> Has left server. And now has \`${data.coins.toFixed(1)}\` coin(s).`)
    .setTimestamp()
    .setImage(`${config.ImageEmbed}`)
    if (channel) channel.send(embed) 
  }
} 
