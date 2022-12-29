const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json')
const emoji = require("../emoji.json")

module.exports = {
  execute: async(client, member, db) => {
     if (member.user.bot) return
    if (await db.fetch(`coins_${member.user.id}`) === null) return
    let data = await get(member, member.user) 
    let time = Date.now() - member.user.createdTimestamp
    if (time < 300) {
		 return 
    } 
    if (data.code == 0) return
    let link = await client.fetchInvite(`https://discord.gg/${data.code}`)
    if (link.inviter.id !== client.user.id) return 
    if (data.users.includes(member.user.id)) return
    if (data.record.includes(member.user.id)) return
    data.logs.unshift(`[+1] - Server join.`)
    data.users.push(member.user.id)
    db.set(`users_${member.guild.id}`, data.users)
    db.set(`logs_${member.user.id}`, data.logs)
    db.add(`coins_${member.user.id}`, 1)
    db.set(`joinedDate_${member.guild.id}_${member.user.id}`, Date.now()) 
    data.record.push(member.user.id)
    db.set(`record_${member.guild.id}`, data.record)
    if (data.uses + 1 >= data.orders) {
      db.set(`orders_${member.guild.id}`, 0)
      db.set(`code_${member.guild.id}`, 0) 
      db.set(`users_${member.guild.id}`, [])
      db.set(`uses_${member.guild.id}`, 0)
      db.set(`record_${member.guild.id}`, [])
      var id = member.guild.id;
      client.guilds.cache.get(id).leave()
    } else {
      db.add(`uses_${member.guild.id}`, 1)
    }
    
    let channel = client.channels.cache.get(`${config.userJoin}`)
      
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setColor(`#2f3136`)
    .setDescription(`${emoji.info} <@${member.user.id}> Has join server. And now has \`${data.coins.toFixed(1)}\` coin(s).\n${emoji.fleche} Server joined: ${member.guild.name}.\nServer stats: \`${data.uses}/${data.orders}\`.`)
    .setTimestamp()
    .setImage("https://images-ext-2.discordapp.net/external/09m3TSBnu6mhLIUTb3zghpGk6Y1EWrR_Vx6dztb6E1Y/https/images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif?width=421&height=54")
    if (channel) channel.send(embed) 
  } 
} 