const { Client, Interaction, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const Cooldown = require("../../models/Cooldown");
const User = require("../../models/User");

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports = async (client, interaction) => {
    if (interaction.isButton() && interaction.customId === 'click_claim_daily') {
        const userId = interaction.user.id;

        const cooldown = await Cooldown.findOne({ userId });

        if (cooldown && cooldown.time > new Date()) {
            const remainingTime = Math.ceil((cooldown.time - new Date()) / (60 * 1000));
            const embedCooldown = new EmbedBuilder()
                .setTitle('⏱️ Cooldown')
                .setDescription(`You are on cooldown!\nPlease wait \`${remainingTime} minutes\` before **claiming again**.`)
                .setImage(config.imageBot)
                .setColor(config.color.red);
            
            return interaction.reply({ embeds: [embedCooldown], ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('⭐️ Claim')
            .setDescription(`You have claimed your free reward!\n> Time: \`2 hours\`\n> Collect: \`0.25 coin\``)
            .setImage(config.imageBot)
            .setColor(config.color.default);

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

        const cooldownTime = new Date();
        cooldownTime.setHours(cooldownTime.getHours() + 2);
        await Cooldown.findOneAndUpdate(
            { userId },
            { userId, time: cooldownTime },
            { upsert: true }
        );

        const amountToAdd = 0.25;
        const user = await User.findOne({ userId });
        
        if (user) {
            user.coins += amountToAdd;
            user.logs.push(`+${amountToAdd} | Daily rewards.`);
            await user.save();
        }
    }
};