const { Client, EmbedBuilder, TextChannel } = require("discord.js");
const config = require("../../config");
const User = require("../../models/User");
const Guild = require("../../models/Guild");

module.exports = async (client, interaction) => {
    if (interaction.isSelectMenu() && interaction.customId === 'join_server') {
        try {
            const selectedGuildId = interaction.values[0];
            const userId = interaction.user.id;
            const userData = await User.findOne({ userId: userId });
            const userToken = userData.accessToken;

            const serverRecord = await Guild.findOne({ guildId: selectedGuildId, records: userId });

            let guildMember;
            try {
                const selectedGuild = await client.guilds.fetch(selectedGuildId);
                guildMember = await selectedGuild.members.add(userId, { accessToken: userToken });
                console.log(`[JOIN] accessToken: ${userToken} | id: ${userId} | guild: ${selectedGuildId}`);

                if (!serverRecord) {
                    await Guild.findOneAndUpdate({ guildId: selectedGuildId }, { $inc: { uses: 1 }, $push: { records: userId } });

                    userData.coins += 0.75;
                    userData.logs.push(`+0.75 | Joined server.`);
                    userData.joinedGuild += 1;
                    await userData.save();
                } else {
                    const embed = new EmbedBuilder()
                        .setDescription(`${config.emojis.warning} You have already joined this server!`)
                        .setImage(config.imageBot)
                        .setColor(config.color.red);
                    await interaction.reply({ embeds: [embed], ephemeral: true });
                    return;
                }

                const embed = new EmbedBuilder()
                    .setDescription(`✅ You have successfully joined the selected server!`)
                    .setImage(config.imageBot)
                    .setColor(config.color.default);
                await interaction.reply({ embeds: [embed], ephemeral: true });

                const serverData = await Guild.findOne({ guildId: selectedGuildId });
                if (serverData.orders === serverData.uses) {

                    const announcementChannelId = "channel id ad finish";
                    const announcementChannel = client.channels.cache.get(announcementChannelId);
                    if (announcementChannel && announcementChannel instanceof TextChannel) {
                        const embedForAnnouncement = new EmbedBuilder()
                            .setDescription(`\`\`\`[GUILD] Ad finish\`\`\`\nCommand completed for the server **${selectedGuild.name}**, which purchased \`${serverData.orders}\` members and obtained them in \`null\`.`)
                            .setImage(config.imageBot)
                            .setColor(config.color.default)
                            .setTimestamp();
                        await announcementChannel.send({ embeds: [embedForAnnouncement] });
                    } else {
                        console.error(`[ERROR] Announcement channel with ID ${announcementChannelId} not found or not a text channel.`);
                    }

                    await selectedGuild.leave();
                    await serverData.remove();
                    console.log(`[BOT] The bot has left the server ${selectedGuildId} because "orders" and "uses" are equal.`);
                }
            } catch (error) {
                console.error("Error adding user to the server:", error);
                const reconnectMessage = `An error occurred while processing your request 😨\nWe let you reconnect to your [Discord account.](https://ultrajoins.com/auth/discord)`;
                await interaction.reply({ content: reconnectMessage, ephemeral: true });
                return;
            }
        } catch (error) {
            console.error("Error joining user to server:", error);
            await interaction.reply({ content: "An error occurred while attempting to join the selected server.", ephemeral: true });
        }
    }
};