const config = require("../config");
const User = require("../models/User");

const allowedUserIds = ["1018098085227933767", "your id"];

module.exports = {
  data: {
    name: "delcoins",
    description: "Remove coins from a user (owner).",
    options: [
      {
        type: 6,
        name: "user",
        required: true,
        description: "The user to remove coins from.",
      },
      {
        type: 4,
        name: "amount",
        required: true,
        description: "Number of coins to remove from the user.",
      },
    ],
  },

  async exe(client, interaction) {
    const userIdToRemoveCoins = interaction.options.getUser("user").id;
    const amountToRemove = interaction.options.getInteger("amount");

    if (!allowedUserIds.includes(interaction.user.id)) {
      return await interaction.reply("You are not authorized to use this command.");
    }

    try {
      const userToUpdate = await User.findOne({ userId: userIdToRemoveCoins });

      if (userToUpdate) {
        userToUpdate.coins -= amountToRemove;
        userToUpdate.logs.push(`-${amountToRemove} | Operation admin.`);
        await userToUpdate.save();

        await interaction.reply(`Removed ${amountToRemove} coin(s) from <@${userIdToRemoveCoins}>.`);
      } else {
        await interaction.reply("User not found in the database.");
      }
    } catch (error) {
      console.error("Error:", error);
      await interaction.reply("An error occurred while processing your request.");
    }
  },
};