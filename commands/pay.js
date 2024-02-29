const { EmbedBuilder } = require("discord.js");
const config = require("../config");
const User = require("../models/User");

module.exports = {
  data: {
    name: "pay",
    description: "Pay coins to a user.",
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

    if (amountToAdd <= 0) {
      const errorEmbed = new EmbedBuilder()
        .setDescription("Please provide a positive number for the number of coins to be given.")
        .setImage(config.imageBot)
        .setColor(config.color.red);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const userPayer = await User.findOne({ userId: interaction.user.id });

    if (!userPayer || userPayer.coins < amountToAdd) {
      const errorEmbed = new EmbedBuilder()
        .setDescription("You do not have enough coins to make this transaction.")
        .setImage(config.imageBot)
        .setColor(config.color.red);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    if (userPayer.userId === userIdToAddCoins) {
      const selfPaymentEmbed = new EmbedBuilder()
        .setDescription("You cannot pay yourself.")
        .setImage(config.imageBot)
        .setColor(config.color.red);
      return await interaction.reply({ embeds: [selfPaymentEmbed], ephemeral: true });
    }

    const userReceiver = await User.findOne({ userId: userIdToAddCoins });

    if (!userReceiver) {
      const errorEmbed = new EmbedBuilder()
        .setDescription("The recipient user does not have a registered account.")
        .setImage(config.imageBot)
        .setColor(config.color.red);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    userPayer.coins -= amountToAdd;
    userPayer.logs.push(`-${amountToAdd} | Pay user.`);
    await userPayer.save();

    userReceiver.coins += amountToAdd;
    userReceiver.logs.push(`+${amountToAdd} | Transaction from user.`);
    await userReceiver.save();

    const successEmbed = new EmbedBuilder()
      .setDescription(`You gave ${amountToAdd} coins to <@${userIdToAddCoins}>.`)
      .setImage(config.imageBot)
      .setColor(config.color.default);
    await interaction.reply({ embeds: [successEmbed], ephemeral: true });
  },
};