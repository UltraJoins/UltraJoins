const Discord = require('discord.js');
const { get } = require('../../constructors/sqlite.js');
const config = require('../../config.json');
const emoji = require('../../emoji.json');

module.exports = {
  name: "pay",
  aliases: [],
  description: "pay coins",
  execute: async(client, message, args, data, db) => {
  
  var server = client.guilds.cache.get(`${message.guild.id}`);
if(server != `${config.serverid}`) {
  message.channel.send('UltraJoin bot commands are **forbidden to use** in other servers, Please **join our support server** to execute UltraJoin bot commands !\n\n`Link:` https://discord.gg/ultrajoins')
  } else {
  
  
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "+";

    let amount = args.filter(x => !x.startsWith("<@"))[0]

    
    let embeded = new Discord.MessageEmbed()
    .setDescription(`${emoji.error} I tried to find your balance... But you did not have enough coins.\n*You must have 1 coins*` )
    .setColor('#2f3136')
    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(embeded)

    let user = message.mentions.users.first()


    /*-------------------------------------------------------------------------*/
    let errorembed = new Discord.MessageEmbed()
    .setDescription(`${emoji.error} I tried to find your balance... But you did not have enough coins.\n*You must have 1 coins*` )
    .setColor(`#2f3136`)
    
    /*-------------------------------------------------------------------------*/
    let minimumbruh = new Discord.MessageEmbed()
    
    .setDescription(`${emoji.error} I tried to find your balance... But you did not have enough coins.\n*You must have 1 coins*` )
    .setColor(`#2f3136`)
    /*-------------------------------------------------------------------------*/
    let thisisbotbruh = new Discord.MessageEmbed()
    
    .setDescription(`${emoji.error} I tried to find your balance... But you did not have enough coins.\n*You must have 1 coins*` )
    .setColor(`#2f3136`)
    /*-------------------------------------------------------------------------*/
    let youcantpay = new Discord.MessageEmbed()
    
    .setDescription(`${emoji.error} I tried to find your balance... But you did not have enough coins.\n*You must have 1 coins*` )
    .setColor(`#2f3136`)
    /*-------------------------------------------------------------------------*/

    if (data.coins < Number(amount)) return message.channel.send(errorembed)

    if (Number(amount) < 1) return message.channel.send(minimumbruh)

    if (user.id === message.author.id) return message.channel.send(youcantpay)

    if (user.bot) return message.channel.send(thisisbotbruh)

    /*-------------------------------------------------------------------------*/

    let paidDMembed = new Discord.MessageEmbed()
    
    
    .setDescription(`${emoji.hype} Hey <@${message.author.id}>, You sent \`${amount}\` coins to <@${user.id}>!`)
    
    
    .setColor('#2f3136')
    
    message.channel.send(paidDMembed)

    /*-------------------------------------------------------------------------*/
        // message.channel.send(`Vous avez payé \`${amount}\` pièces, à ${user}`)
    /*-------------------------------------------------------------------------*/
    let paidembed = new Discord.MessageEmbed()
    
    .setDescription(`<@${message.author.id}> sent you **${amount}** coins!`)
    
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
    user.send(paidembed)
    /*-------------------------------------------------------------------------*/

    data.logs.unshift(`[-${amount}] - You paid ${user.tag}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.subtract(`coins_${message.author.id}`, Number(amount))

    data = await get(message, user)

    data.logs.unshift(`[+${amount}] - ${message.author.tag} you to pay.`)

    db.set(`logs_${user.id}`, data.logs)

    db.add(`coins_${user.id}`, Number(amount))
    
    let logchannel = client.channels.cache.get(`${config.pay}`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    
    .setDescription(`Coins paid by: **${message.author.tag} (${message.author.id})**\nCoins paid to: **${user.tag} (${user.id})**\ nTotal: **${amount}** pieces !`)
    .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTimestamp()
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    logchannel.send(embed)
    
  }
}

}