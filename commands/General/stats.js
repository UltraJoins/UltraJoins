const Discord = require('discord.js');
const ms = require('parse-ms');
const config = require('../../config.json');
module.exports = {
  name: "stats",
  aliases: ["stats", "botinfo"],
  description: "",
  execute: async(client, message, args, data, db, ping) => {

    let uptime = []

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`${x[1]} ${x[0]}`)
    })


    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")

    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`ℹ️ __Information:__\n> RAM: \``+(process.memoryUsage().rss/1024/1024).toFixed(2)+`MB\`\n> Uptime: \``+ uptime.join(", ")+`\`\n> Ping: \``+Math.round(client.ws.ping)+`ms\`\n> Discord.js: \``+Discord.version+ `\`\n> Node.js: \``+process.versions.node+`\`\nℹ️ __Statistics:__\n> Server(s): \``+client.guilds.cache .size+`\`\n> Member(s): \`` +client.users.cache.size+`\`\nMade by \`Ceed#2117\` ❤️.`)
    message.channel.send(embed)
  }

}
