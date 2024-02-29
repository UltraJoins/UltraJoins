const { Client, Interaction, EmbedBuilder } = require("discord.js");
const config = require("../../config");

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports = async (client, interaction) => {
    if (interaction.isButton() && interaction.customId === 'auto_farm') {
        //🥸
    }
}