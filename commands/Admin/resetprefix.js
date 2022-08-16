const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "resetprefix",
  aliases: [""],
  description: "",
  execute: async(client, message, args) => {
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to reset prefix")
    }
    
    if(args.join("+") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("The bot prefix has been reset")
    }
    
    db.set(`prefix_${message.guild.id}`, "+")
  await message.channel.send(`The bot prefix has been reset`)
    
  }
}