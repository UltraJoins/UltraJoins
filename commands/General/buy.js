const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "advertise",
  aliases: ["buy"],
  description: "advertise your server and get members on it.",
  
  execute: async(client, message, args, data, db) => {
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || config.prefix;



    let amount = Number(args[0])
    
    

    const description = args.slice(1).join(" ")
    let needatleastcoins = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`${emoji.error} ${message.author.username}, Please add the bot to your server by running \`+invite\`, and make sure you at least have 3 coins. Now try executing  \`+buy 3\` and you are set to go!`)
    .setColor("#2f3136")
       .setImage(`${config.ImageEmbed}`)
    
    if(amount < 3) return message.channel.send(needatleastcoins)
    if (data.coins < 3) return message.channel.send(needatleastcoins)
    let incorrectcommand = new Discord.MessageEmbed()
    .setDescription(`${emoji.error} ${message.author.username}, Please add the bot to your server by running \`+invite\`, and make sure you at least have 3 coins. Now try executing  \`+buy 3\` and you are set to go!`)
    .setColor("#2f3136")
      .setImage(`${config.ImageEmbed}`)

    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(incorrectcommand)

    if (amount > data.coins) return message.channel.send(needatleastcoins)

    amount = Math.round(amount)

    let link = data.code

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    let invitenotallowed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`${emoji.error} Error: **Please do not include invite links**`)
    .setColor("#2f3136")
     .setImage(`${config.ImageEmbed}`)
    let web = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`${emoji.error} Error: **Please do not include invite links**`)
    .setColor("#2f3136")
      .setImage(`${config.ImageEmbed}`)
    let toolong = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`${emoji.error} Error: **Your description exceeds** \`75\` **words**`)
    .setColor("#2f3136")
     .setImage(`${config.ImageEmbed}`)
    if (description && description.includes("discord.gg")) return message.channel.send(invitenotallowed)
    if (description && description.includes("https://", "http://")) return message.channel.send(web)
    if (description && description.length > 75) return message.channel.send(toolong)
    


    await new Promise(resolve => setTimeout(resolve, 100))

    db.set(`code_${message.guild.id}`, link)

    data.logs.unshift(`[-${amount}] - Purchase members for ${message.guild.name}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\n<:invite:991262872070000660> [**Click here to join**](https://discord.gg/${link})`)

    db.add(`orders_${message.guild.id}`, amount)

    db.subtract(`coins_${message.author.id}`, amount)
    
    let successembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    
    .setColor("#2f3136")
       .setImage(`${config.ImageEmbed}`)
    .setDescription(`[<@${message.author.id}>] You have successfully purchased \`${amount}\` members for your server.\nYou can now check the status of your order from **${client.guilds.cache.get(message.guild. id).name}** with \`+info\``)
    message.channel.send(successembed)
    let logchannel = client.channels.cache.get(`${config.notif}`)
    let embed = new Discord.MessageEmbed()
    
    .setColor("#2f3136")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
     .setDescription("📌 A person has purchased a `promotion` for their server . So hurry up with the `+farm` command to join and win `1` coins!")
    .addField(`Server:`, `${message.guild.name}`, false)
      .setImage(`${config.ImageEmbed}`)
    
    logchannel.send(embed)
  }
}