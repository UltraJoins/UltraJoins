const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "newprefix",
  aliases: ["changeprefix", ""],
  description: "",
  execute: async(client, message, args) => {
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to change prefix")
    }
    
    if(!args[0]) {
      return message.channel.send("Please provide a valid prefix in order to execute this command")
    } 
    
    if(args[1]) {
      return message.channel.send("You can not set prefix a double argument")
    }
    
    if(args[0].length > 3) {
      return message.channel.send("You can not send prefix more than 3 characters")
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("The bot prefix has been reset")
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(`The bot prefix has been updated to \`${args[0]}\`\n\`Example:\` ${args[0]}help`)
    
  }
}