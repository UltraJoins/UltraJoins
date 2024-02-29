const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require("discord.js");
const config = require("../config");
const User = require("../models/User");

module.exports = {
  data: {
    name: "balance",
    description: "View your profile.",
    options: [
      {
        type: 6,
        name: "user",
        required: false,
        description: "The user?",
      },
    ],
  },

  async exe(client, interaction) {
    try {
      let targetUserId = interaction.user.id;
      const userOption = interaction.options.getUser("user");
      if (userOption) {
        targetUserId = userOption.id;
      }

      const userData = await User.findOne({ userId: targetUserId });
      if (!userData) {
        return interaction.reply({ content: `${config.emojis.warning} User not found.`, ephemeral: true });
      }

      const uniqueLogs = new Set(userData.logs);
      const logs = Array.from(uniqueLogs).slice(-9).reverse();

      let components;
      if (logs.length === 0) {
        components = [generateNoLogsSelectMenu()];
      } else {
        components = [generateLogSelectMenu(logs)];
      }

      const embed = generateProfileEmbed(userData);

      await interaction.reply({ embeds: [embed], components: components });
    } catch (error) {
      console.error("Error fetching user data:", error);
      await interaction.reply({ content: "An error occurred while fetching user data.", ephemeral: true });
    }
  },
};

function generateProfileEmbed(userData) {
  return new EmbedBuilder()
    .setTitle(`<@${userData.userId}> profile`)
    .addFields(
      { name: '💰 Coins', value: `${userData.coins} coins` },
      { name: '📊 Stats', value: `Joined Servers: ${userData.joinedGuild}\nPublished ads: ${userData.publishedAds}` },
      { name: 'ℹ️ Details', value: `Created: <t:${Math.floor(userData.createAt.getTime() / 1000)}:F>\nIs an alt: ${userData.premium ? 'yes' : 'no'}`, inline: true },
    )
    .setImage(config.imageBot)
    .setColor(config.color.default);
}

function generateNoLogsSelectMenu() {
  return new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId('log_select_menu')
      .setPlaceholder('No logs found.')
  );
}

function generateLogSelectMenu(logs) {
  const logOptions = logs.map((log, index) => ({
    label: `Log ${index + 1}: ${log}`,
    value: `log_${index}`,
  }));

  const selectMenu = new SelectMenuBuilder()
    .setCustomId('log_select_menu')
    .setPlaceholder('Select a log')
    .addOptions(logOptions);

  return new ActionRowBuilder().addComponents(selectMenu);
}