const { EmbedBuilder, MessageMentions } = require("discord.js");
const config = require("../config");

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (message.mentions.has(client.user.id) && !message.author.bot) {
            const mentionEmbed = new EmbedBuilder()
                .setDescription(`Hey! I am **UltraJoins**, I offer an innovative system to gain members on my Discord server and I have other interesting features.\n> You can use \`/help\` to see my commands!`)
                .setImage(config.imageBot)
                .setColor(config.color.default);
            message.reply({ embeds: [mentionEmbed] });
        }
    }
};