const { EmbedBuilder, TextChannel } = require("discord.js");
const config = require("../config");
const Guild = require("../models/Guild");

module.exports = {
  name: 'guildDelete',
  async execute(client, guild) {
    const channelId = 'channel id  log delete guild';

    const channel = client.channels.cache.get(channelId);

    if (channel instanceof TextChannel) {
      try {
        await Guild.findOneAndDelete({ guildId: guild.id });

        const guildInfoEmbed = new EmbedBuilder()
          .setTitle(`🚜 Delete Server`)
          .setDescription(`> Server ID: \`${guild.id}\`\n> Server Name: \`${guild.name}\`\n> Member Count: \`${guild.memberCount}\``)
          .setImage(config.imageBot)
          .setColor(config.color.default);

        await channel.send({ embeds: [guildInfoEmbed] });
      } catch (error) {
        console.error("Error deleting server data:", error);
      }
    } else {
      console.error(`The specified channel with ID ${channelId} is not a text channel.`);
    }
  }
};