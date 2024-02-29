const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');
const User = require('../models/User');
const Guild = require('../models/Guild');

module.exports = {
  data: {
    name: 'farm',
    description: 'Join server earn coin.',
  },

  async exe(client, interaction) {
    try {
      if (!interaction.member) {
        const embed = new EmbedBuilder()
        .setDescription(`${config.emojis.warning} Please [**login**](https://ultrajoins.com/auth/discord) to use this command.\n> **Note:** We need your permission to have you join servers.`)
        .setImage(config.imageBot)
        .setColor(config.color.red);
        
        return interaction.reply({ content: `Link: <https://ultrajoins.com/auth/discord> **SECURE** ✅`, embeds: [embed] });
      }

      const userId = interaction.member.id;
      const user = await User.findOne({ userId });

      if (!user || !user.accessToken) {
        const embed = new EmbedBuilder()
        .setDescription(`${config.emojis.warning} Please [**login**](https://ultrajoins.com/auth/discord) to use this command.\n> **Note:** We need your permission to have you join servers.`)
        .setImage(config.imageBot)
        .setColor(config.color.red);
        
        return interaction.reply({ content: `Link: <https://ultrajoins.com/auth/discord> **SECURE** ✅`, embeds: [embed] });
      }

      const guildsDB = await Guild.find({});
      const filteredGuilds = guildsDB.filter(({ guildId }) => !client.guilds.cache.get(guildId).members.cache.has(userId));
      const sortedGuilds = filteredGuilds.sort((a, b) => (b.uses / b.orders) - (a.uses / a.orders));
      const serverOptions = sortedGuilds.slice(0, 5).map(({ guildId, uses, orders }) => {
        const guild = client.guilds.cache.get(guildId);
        const guildName = guild ? guild.name : "Unknown Server";
        const joinPercentage = Math.floor((uses / orders) * 100);

        return {
          label: guildName,
          value: guildId,
          description: `${uses} / ${orders} (${joinPercentage}%)`,
        };
      });

      if (serverOptions.length === 0) {
        const embed = new EmbedBuilder()
        .setTitle(`${config.emojis.tractor} Farm`)
        .setDescription(`Join one the servers **from the drop down menu** to earn 💰.`)
        .addFields(
		{ name: `${config.emojis.warning} Remember`, value: `Leaving the servers before **2** days will deduct **2** 💰 from your balance!` },
		{ name: `\u200B`, value: `${config.emojis.gift} Don't see any other servers? Join our [**support server**](${config.supportGuild}) to get more coins!` },
	)
        .setImage(config.imageBot)
        .setColor(config.color.default);
        
        return interaction.reply({ embeds: [embed], ephemeral: false });
      }

      const embed = new EmbedBuilder()
        .setTitle(`${config.emojis.tractor} Farm`)
        .setDescription(`Join one the servers **from the drop down menu** to earn 💰.`)
        .addFields(
		{ name: `${config.emojis.warning} Remember`, value: `Leaving the servers before **2** days will deduct **2** 💰 from your balance!` },
		{ name: `\u200B`, value: `${config.emojis.gift} Don't see any other servers? Join our [**support server**](${config.supportGuild}) to get more coins!` },
	)
        .setImage(config.imageBot)
        .setColor(config.color.default);
      
      const selectMenu = new SelectMenuBuilder()
        .setCustomId('join_server')
        .setPlaceholder('Join a server...')
        .addOptions(serverOptions);

      const actionRowSelectMenu = new ActionRowBuilder().addComponents(selectMenu);

      const autoFarmButton = new ButtonBuilder()
        .setStyle(1)
        .setEmoji('🚜')
        .setLabel('Auto Farm')
        .setCustomId('auto_farm');

      const actionRowAutoFarmButton = new ActionRowBuilder().addComponents(autoFarmButton);

      await interaction.reply({
        embeds: [embed],
        components: [actionRowAutoFarmButton, actionRowSelectMenu],
        ephemeral: false,
      });
    } catch (error) {
      console.error('Error executing farm command:', error);
      await interaction.reply({ content: 'An error occurred while processing your request 😨\nWe let you reconnect to your [Discord account.](https://ultrajoins.com/auth/discord)', ephemeral: true });
    }
  },
};