const { EmbedBuilder, TextChannel } = require("discord.js");
const config = require("../config");
const User = require("../models/User");
const Guild = require("../models/Guild");

module.exports = {
  data: {
    name: "publish",
    description: "Create a new ad for this server.",
    options: [
      {
        type: 4,
        name: "amount",
        required: true,
        description: "The number of people you want to get.",
      },
    ],
  },

  async exe(client, interaction) {
    try {
      const userId = interaction.user.id;
      const amount = interaction.options.getInteger("amount");

      const userData = await User.findOne({ userId: userId });
      if (!userData) {
        return interaction.reply({ content: `${config.emojis.warning} You need to connect your account to use this command.`, ephemeral: true });
      }

      if (amount <= 0) {
        return interaction.reply({ content: `${config.emojis.warning} Invalid amount. Please provide a positive number.`, ephemeral: true });
      }

      if (userData.coins < amount) {
        return interaction.reply({ content: `${config.emojis.warning} You don't have enough coins.`, ephemeral: true });
      }

      const guildId = interaction.guildId;
      const guild = client.guilds.cache.get(guildId);

      if (!guild) {
        return interaction.reply({ content: `${config.emojis.warning} Unable to find the server.`, ephemeral: true });
      }

      if (guildId === "your guild id") {
        return interaction.reply({ content: `${config.emojis.warning} This command is disabled on this server.\n\n__**NOTE:**__ You can buy some for your server, just add <@1044354038327685212> on your server and then execute the command on yours and the turn and play more than expected!!`, ephemeral: true });
      }

      userData.coins -= amount;
      userData.publishedAds += 1;
      userData.logs.push(`-${amount} | Buy members.`);
      await userData.save();

      let guildData = await Guild.findOne({ guildId: guildId });
      if (guildData) {
        guildData.buyer = userId
        guildData.orders += amount;
        await guildData.save();
      } else {
        await Guild.create({ guildId: guildId, orders: amount });
      }

      const embed = new EmbedBuilder()
        .setDescription(`You have successfully purchased ${amount} members.`)
        .setImage(config.imageBot)
        .setColor(config.color.default);
      await interaction.reply({ embeds: [embed], ephemeral: true });

      const announcementChannelId = "channel id new ad create";
      const announcementChannel = client.channels.cache.get(announcementChannelId);
      if (announcementChannel && announcementChannel instanceof TextChannel) {
        const embedForAnnouncement = new EmbedBuilder()
          .setDescription(`\`\`\`[GUILD] New ad detect\`\`\`\n- Name : **${guild.name}** ℹ️\n- Amount : \`${amount}\` membres\n\n__**INFO :**__ Help grow other communities by joining them using the \`/farm\` command 🚜`)
          .setImage(config.imageBot)
          .setColor(config.color.default)
          .setTimestamp();
        await announcementChannel.send({ embeds: [embedForAnnouncement] });
      } else {
        console.error(`[ERROR] Announcement channel with ID ${announcementChannelId} not found or not a text channel.`);
      }
    } catch (error) {
      console.error("Error executing publish command:", error);
      await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
    }
  },
};