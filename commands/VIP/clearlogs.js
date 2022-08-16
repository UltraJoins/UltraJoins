const Discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: "clearlogs",
  aliases: ["cl", "prunelogs"],
  account: true,
  description: "",
  execute: async(client, message, args, data, db) => {
    
    let owners = config.OwnerID;
    
    if (!owners.includes(message.author.id)) return
   
    if (data.logs.length == 0) return message.channel.send(`${message.author.username} your logs are already empty.`)
    
    else message.channel.send(`${message.author.username} your logs have been successfully deleted.`), db.set(`logs_${message.author.id}`, []) 
  } 
} 