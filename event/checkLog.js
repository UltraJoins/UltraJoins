const { EmbedBuilder } = require("discord.js");
const config = require("../config");
const User = require("../models/User");

async function checkLog(client, interaction, exe) {
  try {
    const userId = interaction.user.id;

    const user = await User.findOne({ userId });

    if (user && user.logs) {
      if (user.logs.length > 10) {
        user.logs = user.logs.slice(user.logs.length - 10);
        await user.save();
      }

      await exe(client, interaction);
    }
  } catch (error) {
    console.error("Error in checkLog:", error);
  }
}

module.exports = checkLog;