const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js') 
const freecoins = require('../events/coins.js')
const ms = require('ms')
const parse = require('parse-ms')
const config = require('../config.json')
module.exports = {
  execute: async (client, message, prefix, db) => {
    
    if (message.author.bot || message.channel.type === "dm") return
    
    
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let x = args.shift().toLowerCase();



    if (!message.content.startsWith(prefix) || !x) return;
    
    
    
    let command = client.commands.get(x) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(x))
    
    if (!command) return
    
    let time = Date.now() - message.author.createdTimestamp
    
    if (time < 300) {
      let text = []
      time = Date.now() - message.author.createdTimestamp
      time = 300 - time 
      Object.entries(parse(time)).map((x, y) => {
        if (x[1] > 0 && y < 4) text.push(`**${x[1]} ${x[0]}**`) 
      })
      return message.channel.send({
        embed: {
          color: "#2f3136",
          title: `Sorry, ${message.author.username}.`,
          description: "You are new to Discord",
          fields: [
            {
              name: "Wait:",
              value: text.join(", ") 
            } 
          ] 
        }
      }) 
    } 
    
    let data = await get(message, message.author) 
    
    let embed1 = new Discord.MessageEmbed()
    .setDescription(`You cannot execute any commands, because you have been blacklist from the system.\nContact \`Ceed#0001\` or \`Txslx#2065\` to be whitelist!`)
     .setImage(`${config.ImageEmbed}`)
    .setColor('#2f3136')
   
    if (data.banned == true && message.author.id !== "ttt") return message.channel.send(embed1)
    
    try {
    command.execute(client, message, args, data, db)
    } catch(e) {
      message.channel.send(e.message) 
    } 
  } 
} 
