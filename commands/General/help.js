const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const config = require('../../config.json');
const emoji = require('../../emoji.json');
 

module.exports = {
  name: "help",
  aliases: [""],
  description: "",
  execute: async(client, message) => {


 
    
    message.channel.send("Good news, we have released a new version of UltraJoins, with lots of new features!\nMore information at https://discord.gg/ultrajoins")
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
        
        .setDescription(`● If you need help, join our [support server](${config.supportServer}).\n● UltraJoins dev by **Ceed#2117**.\n\n\`🏆\` **Owner**: \`list\`, \`addbal\`, \`bbal\`, \`del\`, \`blacklist\`, \`whitelist\`, \`remove\`, \`leaveserv\`.\n\`⚒️\` **Administration**: \`newprefix\`, \`lang\`.\n\`💎\` **General**: \`help\`, \`invite\`, \`bal\`, \`pay\`, \`check\`, \`info\`, \`buy\`, \`giftcode\`, \`bug\`, \`stats\`, \`farm\`.`)
    
    .addField("🔗 Links", `[Support](${config.supportServer}) ● [Add Me](${config.addBot})`, false)
    .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
        .setColor('#2f3136');
        
    message.channel.send(embed)
    
      
    
  } 
}