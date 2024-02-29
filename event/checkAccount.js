const { EmbedBuilder } = require("discord.js");
const config = require("../config");
const User = require("../models/User");
const checkBlacklist = require("./checkBlacklist");

async function checkAccount(interaction, exe) {
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (user) {
        return checkBlacklist(interaction, user, exe);
    } else {
        const newUser = new User({ userId });
        await newUser.save();
        const welcomeEmbed = new EmbedBuilder()
            .setDescription(`⭐️ Hey <@${interaction.user.id}>, you now have an account registered in our database!\n\n__Why did I receive this message? __\nYou received this message because you do not have an account registered in the database.`)
            .setImage(config.imageBot)
            .setColor(config.color.default);
        interaction.reply({ embeds: [welcomeEmbed], ephemeral: true }).then(() => {
            
        });
    }
}

module.exports = checkAccount;