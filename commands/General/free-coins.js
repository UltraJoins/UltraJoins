const Discord = require('discord.js')
const { get } = require('../../constructors/sqlite.js')
let cooldown = new Map();
const config = require('../../config.json');

module.exports = {
  name: "free",
  description: "Code modifier par Ceed",
  execute: async(client, message, args, data, db) => {

    if (message.channel.id !== `${config.freecoins}`) return;
    
    // Delete a message
message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
    
    let time = Date.now(); 
    if(cooldown.get(message.author.id) > time)
    { 
       const erreur = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`...`)
        .setImage(`${config.ImageEmbed}`)
      .setFooter(config.EmbedFooter)
      message.channel.send(erreur).then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error);return;}   
    
    
    db.add(`coins_${message.author.id}`, 1) 
    
    cooldown.set(message.author.id, time + 1800);

    data.logs.unshift(`[+1] - Free coins !`)
    db.set(`logs_${message.author.id}`, data.logs)

       const success = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`ℹ️ **${message.author.tag}**, you just recovered \`1\` coins.\n\n*You can earn more coins with the +farm command!*`)
        .setImage(`${config.ImageEmbed}`)
      
      const countdownEmbed2 = new Discord.MessageEmbed()
     .setColor('#2f3136')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
     .setDescription(`⚠️ **${message.author.tag}, the coin system will soon disappear!** ⚠️\n\nThe embed is automatically modified! Thank you for contributing to the project! I invite you to reproduce the same order in 6 hours! Good luck and I hope your server will grow with our system.`)
       .setImage(`${config.ImageEmbed}`)
      
      message.channel.send(success).then((msg) => {
    setTimeout(function () {
        msg.edit(countdownEmbed2);
    }, 12000)
})
      
  } 
   } 