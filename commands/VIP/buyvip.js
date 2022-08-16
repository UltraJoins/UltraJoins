const Discord = require("discord.js");
const ms = require("parse-ms");
const config = require("../../config.json");
const emoji = require("../../emoji.json");
module.exports = {
  name: "buyvip",
  
  description: "shows the bot premium information ",
  execute: async (client, message, args, data, db) => {      
  
     const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor('UltraJoins', client.user.displayAvatarURL())
    .setDescription(`${emoji.premium} Unlock it's advantage:\n\`1): YOU CAN VIPDAILY COMMAND\`\n\`2): YOU CAN CLEARLOGS COMMAND\``)
 message.channel.send(embed);
  }
};