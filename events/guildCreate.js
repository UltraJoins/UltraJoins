const Discord = require('discord.js')
const config = require('../config.json')
const emoji = require("../emoji.json")

module.exports = {
  execute: async(client, guild) => {
    
    let channel = client.channels.cache.get(`${config.guildCreate}`)
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${emoji.UltraJoins} UltraJoins has joined a server !`)
    .setColor(`#2f3136`)
    .setDescription("ℹ️ __About:__\n• **Name:** \`"+ guild.name +"\`\n• **ID:** \`"+guild.id+"\`\n • **Owner:** \`"+ guild.owner.user.tag +"\`\n• **Members:** \`"+guild.memberCount+"\`")
    .setThumbnail(guild.iconURL())
    if (channel) channel.send(embed) 
    
    let joinEmbed = new Discord.MessageEmbed()
         .setTitle("UltraJoins :heart:")
        .setDescription(`Hello ${guild.owner.user.username}, thank you for using our system!\n\n> 1️⃣ Use the \`+farm\` command to collect money from the bot.\n> 2️⃣ Use the command \`+buy <amount>\` to be able to buy ads.\n> 3️⃣ Use the \`+info\` command, to see the progress of your order!\n\<:eya:999283617966604308> **Use the command \`+newprefix\`, to change the prefix of the bot!**\n\nWe would like you to join the official [Discord support server](${config.supportServer})`)
        .setColor("#2f3136")
    
        guild.owner.send(joinEmbed);

  } 
} 
