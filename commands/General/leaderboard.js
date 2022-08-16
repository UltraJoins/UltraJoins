const db = require('quick.db')
const Discord = require('discord.js');
const { get } = require('../../constructors/sqlite.js');
const config = require('../../config.json');
const emoji = require('../../emoji.json');

module.exports = {
  name: "leaderboard",
  aliases: [ "ml" ],
  description: "",
  execute: async(client, message, args, data, db) => {
		let coins = db.all().filter(data => data.ID.startsWith(`coins`)).sort((a, b) => b.data - a.data)
		coins.length = 10;
		var finalLb = "";
		for (var i in coins) {
		  finalLb += `**${coins.indexOf(coins[i])+1}. ${client.users.cache.get(coins[i].ID.split('_')[1]) ? client.users.cache.get(coins[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - **${coins[i].data}** <a:money:1004370664389623828>\n`;
		}
		const embed = new Discord.MessageEmbed()
		.setTitle(`Money Leaderboard`, message.guild.iconURL())
		.setColor("#2f3136")
		.setDescription(`${finalLb}`)
		   .setImage(`${config.ImageEmbed}`)
		message.channel.send(embed);
	}
}