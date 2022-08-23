/*const Discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: "leaveguild",
  description: "",
  execute: async(client, message, args) => {
   
    let owners = config.OwnerID;
    let obj = [] 
    
    if (!owners.includes(message.author.id)) return

  
    const guildId = args[0];
    
    const guild = message.client.guilds.cache.get(guildId);
    
    await guild.leave();
    const embed = new Discord.MessageEmbed()
      .setTitle('Leave a Discord guild!')
      .setDescription(`I successfully left ( **${guild.name}** ).`)
        .setImage(`${config.ImageEmbed}`)
      .setColor("#2f3136");
    message.channel.send(embed);
  } 
};*/