const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const User = require('../models/User');
const Guild = require('../models/Guild');

module.exports = {
  data: {
    name: 'progress',
    description: 'See the progress of your ad.',
  },

  async exe(client, interaction) {
    try {
      const guildId = interaction.guildId;
      const guildData = await Guild.findOne({ guildId: guildId });
      
      if (!guildData) {
        return interaction.reply({ content: 'No ad found for this server.', ephemeral: true });
      }

      //const createdAt = guildData.createdAt;
      const createdAt = new Date(guildData.createdAt);
      const buyerId = guildData.buyer;
      const orders = guildData.orders;
      const uses = guildData.uses;
      const percentage = Math.round((uses / orders) * 100);

      const buyerName = client.users.cache.get(buyerId)?.username || 'Unknown';
      const formattedCreatedAt = `<t:${Math.floor(createdAt.getTime() / 1000)}:F>`;

      const embed = new EmbedBuilder()
        .setTitle('Ad Progress')
        .setColor(config.color.default)
        .setDescription(`${formattedCreatedAt}`)
        .addFields(
		{ name: `Buyer`, value: `${buyerName} (${buyerId})` },
		{ name: `Orders / Uses`, value: `${uses} / ${orders} (${percentage}%)` },
	 );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error fetching ad progress:', error);
      await interaction.reply({ content: 'An error occurred while fetching ad progress.', ephemeral: true });
    }
  },
};