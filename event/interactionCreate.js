const { InteractionType, TextChannel, EmbedBuilder } = require("discord.js");

const checkLog = require("./checkLog");
const checkAccount = require("./checkAccount");
const buttonDaily = require("./buttons/claim_daily");
const joinServer = require("./menus/join_server");
const autoFarm = require("./buttons/auto_farm");

const config = require("../config");

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (interaction.isButton()) {
    buttonDaily(client, interaction)
    autoFarm(client, interaction);
  }
  
        if (interaction.isSelectMenu()) {
            joinServer(client, interaction);
        }
        
        if (interaction.isCommand()) {
            const { exe } = require(`../commands/${interaction.commandName}`);

            const channelId = 'channel id log command'

            const channel = client.channels.cache.get(channelId);

            if (channel instanceof TextChannel) {
                const notificationEmbed = new EmbedBuilder()
                    .setTitle("👤 Command Executed")
                    .setDescription(`> User: \`${interaction.user.tag}\`\n> Executed: \`/${interaction.commandName}\`\n> Server: \`${interaction.guild.name}\``)
                    .setImage(config.imageBot)
                    .setColor(config.color.default);

                await channel.send({ embeds: [notificationEmbed] });

                await checkLog(client, interaction, exe);
                await checkAccount(interaction, exe);
            } else {
                console.error(`The specified channel with ID ${channelId} is not a text channel.`);
            }
        }
    }
};