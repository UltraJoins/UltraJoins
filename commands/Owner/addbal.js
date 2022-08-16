const Discord = require('discord.js');
const config = require('../../config.json');
const { get } = require('../../constructors/sqlite.js');
const emoji = require("../../emoji.json");
module.exports = {
  name: "addbal",
  aliases: ["addcoins", "addcoin"],
  description: "",
  execute: async(client, message, args, data, db) => {
//
    let owners = config.OwnerID;

    

    if (!owners.includes(message.author.id)) return

    let pay = Number(args[1])

    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ Syntax error : **${config.prefix}addbal <membre> <coins>**`)
    .setColor('#2f3136')
    if (!pay || isNaN(pay)) return message.channel.send(embeded)

    let user = message.mentions.users.first()
    let logchannel = client.channels.cache.get(`${config.addbal}`)
    let embed = new Discord.MessageEmbed()
    
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`**User: <@${message.author.id}>**, just added **${pay}** coin(s) to <@${user.id}>`)
    .setColor('#2f3136')
    .setImage(`${config.ImageEmbed}`)
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: "png", dynamic: true }))
    let embedede = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`${emoji.hype} <@${user.id}>, \`${pay}\` coin(s) has been added into your balance.`)
    .setColor('#2f3136')
      .setImage(`${config.ImageEmbed}`)
    message.channel.send(embedede)
    logchannel.send(embed)
    db.add(`coins_${user.id}`, pay)
    data.logs.unshift(`[+${pay}] - Coins given by an administrator.`)
    db.set(`logs_${user.id}`, data.logs)

  }
}
