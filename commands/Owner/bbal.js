const Discord = require('discord.js');
const { get } = require('../../constructors/sqlite.js');
const config = require('../../config.json');
module.exports = {
  name: "bbalance",
  aliases: ["bbal"],
  description: "",
  execute: async(client, message, args, data, db) => {
   
     let owners = config.OwnerID;

    

    if (!owners.includes(message.author.id)) return
  
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first() || message.author
    
    
    if (user.username === undefined) user = user.user
    
    data = await get(message, user)
    
    let logs = []
    
    data.logs.map((x, y) => {
      if (y < 6) logs.push(x)
    })
    
    const embed = new Discord.MessageEmbed()
    .setAuthor("UltraJoins", client.user.displayAvatarURL())
    .setDescription(`Hello, ${user.username} at \`${data.coins.toFixed(1)}\` coin(s) 💰`)
    .addField(`💳 __**This is last operations**__`, logs.length == 0 ? "No transaction history found!" : logs.join("\n"))
    .setColor("#2f3136")
     .setImage(`${config.ImageEmbed}`)
    message.channel.send(embed) 
  } 
}