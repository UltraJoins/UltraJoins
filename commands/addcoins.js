const config = require("../config");
const User = require("../models/User");

const allowedUserIds = ["1018098085227933767", "your id"];

module.exports = {
  data: {
    name: "addcoins",
    description: "Give coins to a user (owner).",
    options: [
      {
        type: 6,
        name: "user",
        required: true,
        description: "The user to give coins to.",
      },
      {
        type: 4,
        name: "amount",
        required: true,
        description: "Number of coins to give to the user.",
      },
    ],
  },

  async exe(client, interaction) {
    const userIdToAddCoins = interaction.options.getUser("user").id;
    const amountToAdd = interaction.options.getInteger("amount");

    if (!allowedUserIds.includes(interaction.user.id)) {
      return await interaction.reply("You are not authorized to use this command.");
    }

    try {
      const userToUpdate = await User.findOne({ userId: userIdToAddCoins });

      if (userToUpdate) {
        userToUpdate.coins += amountToAdd;
        userToUpdate.logs.push(`+${amountToAdd} | Operation admin.`);
        await userToUpdate.save();

        await interaction.reply(`Add ${amountToAdd} coin(s) to <@${userIdToAddCoins}>.`);
      } else {
        await interaction.reply("User not found in the database.");
      }
    } catch (error) {
      console.error("Error:", error);
      await interaction.reply("An error occurred while processing your request.");
    }
  },
};