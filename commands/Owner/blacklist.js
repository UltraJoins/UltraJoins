const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
  name: "blacklist",
  description: "",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID;
    
    if (!owners.includes(message.author.id)) return
    
    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.slice(0, user.username.split(" ").length).join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()
    const membernotfound = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`❎ User not found.`)
    .setFooter(config.EmbedFooter)
    if (user === undefined) return message.channel.send(membernotfound)
    
    let reason = args.slice(1).join(" ")
    
    if (!reason) reason = `No reason given`
    
    let embed1 = new Discord.MessageEmbed()
    
    .setDescription(`Name: **${user.username}** (\`${user.id}\`)\nReason: **${reason}**\nBlacklist by: <@${message.author.id}> `)
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
     .setImage(`${config.ImageEmbed}`)
    .setFooter(config.EmbedFooter)
    message.channel.send(embed1)
    let bannedchannel = client.channels.cache.get(`${config.blacklist}`)
    let embed = new Discord.MessageEmbed()
    
    .setDescription(`Name: **${user.username}** (\`${user.id}\`)\nReason: **${reason}**\nBlacklist by: <@${message.author.id}> `)
    .setColor('#2f3136')
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
     .setImage(`${config.ImageEmbed}`)
    .setFooter(config.EmbedFooter)
    bannedchannel.send(embed)

    db.set(`banned_${user.id}`, true) 

  } 
}