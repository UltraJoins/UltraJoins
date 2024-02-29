const { EmbedBuilder } = require("discord.js");
const config = require("../config");

async function checkBlacklist(interaction, user, exe) {
    if (user.isBlacklisted) {
        const blacklistEmbed = new EmbedBuilder()
            .setDescription(`⚠️ Oh no.. I just noticed that a **administrator** of the UltraJoins team has blacklisted you from the system.\n\nDo you think it's a mistake on our part? I invite you to join the [UltraJoins unban](${config.unbanGuild}) server.`)
            .setImage(config.imageBot)
            .setColor(config.color.red);
        interaction.reply({ embeds: [blacklistEmbed], ephemeral: true });
    } else {
        
    }
}

module.exports = checkBlacklist;