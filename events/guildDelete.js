const Discord = require('discord.js')
const config = require('../config.json')
const emoji = require("../emoji.json")

module.exports = {
  execute: async(client, guild) => {

    let channel = client.channels.cache.get(`${config.guildDelete}`)
 

const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${emoji.UltraJoins} UltraJoins left server!`)
    .setColor(`#2f3136`)
    .setDescription("ℹ️ __About:__\n• **Name:** \`"+ guild.name +"\`\n• **ID:** \`"+guild.id+"\`\n • **Members:** \`"+guild.memberCount+"\`")
    .setThumbnail(guild.iconURL())
    if (channel) channel.send(embed) 

  } 
} 
