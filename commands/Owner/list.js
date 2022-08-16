const Discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: "list",
  description: "",
  execute: async(client, message) => {
   
    let owners = config.OwnerID;
    let obj = [] 
    
    if (!owners.includes(message.author.id)) return
    
    client.guilds.cache.map(async x => {
      //await x.fetchMembers() 
      obj.push({
        name: x.name,
        members: x.memberCount
      }) 
    }) 

    let content = []
    
    let size = obj.length
    
    if (size > 20) size = 20
    
    obj = obj.sort((x, y) => y.members - x.members) 
    
    for (let i = 0;i < size;i++) {  
      content.push(`**__${i + 1}# - ${obj[i].name}__**:\n${obj[i].members} membres.`) 
    }
    
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136') 
    .setTitle(`**Here is the list of servers**:`)
    .setDescription(content.join("\n")) 
    
    
    message.channel.send(embed) 
  } 
} 