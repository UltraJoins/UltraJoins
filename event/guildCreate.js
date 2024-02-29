const { EmbedBuilder, TextChannel } = require("discord.js");
const config = require("../config");

module.exports = {
    name: 'guildCreate',
    async execute(client, guild) {
        const channelId = 'channel id logs new guild';

        const channel = client.channels.cache.get(channelId);

        if (channel instanceof TextChannel) {
            const guildInfoEmbed = new EmbedBuilder()
                .setTitle(`🚜 New Server`)
                .setDescription(`> Server ID: \`${guild.id}\`\n> Server Name: \`${guild.name}\`\n> Member Count: \`${guild.memberCount}\``)
                .setImage(config.imageBot)
                .setColor(config.color.default);

            await channel.send({ embeds: [guildInfoEmbed] });
        } else {
            console.error(`The specified channel with ID ${channelId} is not a text channel.`);
        }
    }
};