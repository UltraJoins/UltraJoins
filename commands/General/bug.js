const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "bug",
  aliases: [""],
  description: "advertise your server and get members on it.",

execute: async (client, message, args) => {
		
		if (!args[0])
			return message.reply(
				"⚠️ Please specify the bug. Example:\n`+bug isn't working. It isn't mentioning the user I'm trying to punch`"
			);
		if (args[0] === 'bug')
			return message.reply(
				"Please specify the bug. Example:\n`+bug isn't working. It isn't mentioning the user I'm trying to punch`"
			);
		args = args.join(' ');
		message.reply(
			'❤ Thanks for submitting a bug!'
		);
		const content = `\`\`\`${message.author.username}#${
			message.author.discriminator
		} (${
			message.author.id
		}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: ${
			message.guild.name
		}\nServer ID: ${message.guild.id}\`\`\``;
		client.channels.cache.get(`${config.bugchannel}`).send(content);
	}
};