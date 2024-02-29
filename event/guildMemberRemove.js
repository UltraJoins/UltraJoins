const { EmbedBuilder, TextChannel } = require("discord.js");
const config = require("../config");
const Guild = require("../models/Guild");
const User = require("../models/User");

/**
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = {
  name: 'guildMemberRemove',
  async execute(client, member) {
    try {
      const userId = member.user.id;
      const user = await User.findOne({ userId });

      if (!user) {
        return;
      }

      const guild = await Guild.findOne({ guildId: member.guild.id });

      if (guild && guild.records.includes(userId)) {
        const bonus = -2;

        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

        if (member.joinedTimestamp > twoDaysAgo.getTime()) {
          user.coins += bonus;
          user.logs.push(`-${bonus} | Leave server.`);
          await user.save();

          const logsChannelId = 'channel id log user left';
          const logsChannel = client.channels.cache.get(logsChannelId);

          if (logsChannel instanceof TextChannel) {
            const leaveEmbed = new EmbedBuilder()
              .setTitle("🚜 User Left Server")
              .setDescription(`- This user left a server and therefore lost \`2 coins\`!\n> User: \`${member.user.tag}\`\n> Server Name: \`null\``)
              .setImage(config.imageBot)
              .setColor(config.color.default);

            await logsChannel.send({ embeds: [leaveEmbed] });

            console.log(`[INVITES] User ${member.user.tag} left the server, removed ${bonus} coins.`);
          } else {
            console.error(`The specified channel with ID ${logsChannelId} is not a text channel.`);
          }
        } else {
          console.log(`[INVITES] User ${member.user.tag} left the server after 2 days, no action taken.`);
        }
      }
    } catch (error) {
      console.error("Error processing guildMemberRemove event:", error);
    }
  }
};