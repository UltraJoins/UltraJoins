const config = require("../config");
const User = require("../models/User");

const allowedUserIds = ["1018098085227933767", "your id"];

module.exports = {
  data: {
    name: "blacklist",
    description: "Blacklist a user (owner).",
    options: [
      {
        type: 6,
        name: "user",
        required: true,
        description: "The user to blacklist or unblacklist.",
      },
      {
        type: 5,
        name: "status",
        required: true,
        description: "True = enabled / False = disabled.",
      },
    ],
  },

  async exe(client, interaction) {
    if (!allowedUserIds.includes(interaction.user.id)) {
      return await interaction.reply(`${config.emojis.warning} You are not authorized to use this command.`);
    }

    const userIdToBlacklist = interaction.options.getUser("user").id;
    const newStatus = interaction.options.getBoolean("status");

    try {
      const userToUpdate = await User.findOne({ userId: userIdToBlacklist });

      if (userToUpdate) {
        userToUpdate.isBlacklisted = newStatus;
        await userToUpdate.save();

        await interaction.reply(`Updated data for <@${userIdToBlacklist}>.`);
      } else {
        await interaction.reply("User not found in the database.");
      }
    } catch (error) {
      console.error("Error:", error);
      await interaction.reply("An error occurred while processing your request.");
    }
  },
};