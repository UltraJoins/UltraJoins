const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../config");
const User = require("../models/User");
const { genLeaderboardCard } = require("../lib/utils");

module.exports = {
  data: {
    name: "leaderboard",
    description: "See the leaderboard of UltraJoins.",
  },

  async exe(client, interaction) {
    try {
      const usersData = await User.find({}).sort({ coins: -1 }).limit(4);
      const imageBuffer = await genLeaderboardCard(client, usersData);

      const attachment = new AttachmentBuilder(imageBuffer, "leaderboard.png");

      await interaction.reply({ files: [attachment] });
    } catch (error) {
      console.error("Error when retrieving the leaderboard:", error);
      await interaction.reply(`An error occurred while processing your request.`);
    }
  },
};