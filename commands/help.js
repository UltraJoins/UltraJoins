const config = require("../config");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "help",
    description: "About the bot.",
  },

  async exe(client, interaction) {   
     const helpEmbed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
      .setDescription(`This bot was created and developed by **@Ceed#2117**.\n\nOur bot will allow you to create and get members for your future community. You just have to create an ad for your server.`)
      .addFields(
		{ name: "/ Commands", value: `\`/balance\` View your profile.\n\`/farm\` Join servers to earn coins.\n\`/help\` About the bot.\n\`/publish\` Create new ad for this server.` },
	)
      .setImage(config.imageBot)
      .setColor(config.color.default);

    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};