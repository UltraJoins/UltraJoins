const { REST, Routes, Client, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require("../config");
const fs = require("fs");
const mongoose = require("mongoose");
const Guild = require("../models/Guild");
const User = require("../models/User");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[BOT] I am connected to ${client.user.tag}.`)
        
        mongoose.connect(`${config.bot.bdd}`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`[MONGODB] I successfully logged in!`)
        
        updatePresence();
        
        function updatePresence() {
            User.countDocuments().then(userCount => {
                client.user.setPresence({
                    activities: [{ name: `/help | @me | ${userCount} users`, type: ActivityType.Watching }],
                });
            }).catch(error => {
                console.error('Error updating presence:', error);
            });
        }

        setInterval(updatePresence, 300000);

        const commandsFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));
        for (const file of commandsFiles) {
            let { data } = require(`../commands/${file}`);
            data.name = file.replace(/\.[^.]*$/, "");
            client.application.commands.create(data).then(() => {
                console.log(`[SLASH] /${data.name} functional!`);
            }).catch(({ stack }) => {
                console.error(`[ERROR] The slash command "${data.name}" encountered an error:`, stack);
            });
        };
        
        const rest = new REST({ version: '10' }).setToken(config.bot.token);
        
        
        //🇺🇸 This code is used to send an embed in a living room (free-coin) to be able to ensure that when the user presses the button on the embed send at the start of the code he can give 0.25 corners every 2 hours.
        //🇫🇷 Ce code sert a envoyer un embed dans un salon (free-coin) pour pouvoir faire en sorte que quand l'utilisateur appuie sur le bouton se trouvant sur l'embed envoyer au demarrage du code sa puisse donner 0,25 coins toute les 2h.
        
        
        /*const announcementChannelId = "channel id channel name free-coin";
        const announcementChannel = client.channels.cache.get(announcementChannelId);

        if (announcementChannel) {
            const embed = new EmbedBuilder()
                .setTitle("⭐️ Claim free rewards")
                .setDescription("- Collect `0.25` piece every **2 hours** for free!\n> Please simply click on the `Collect 0.25 money!` button 👤")
                .setImage(config.imageBot)
                .setColor(config.color.default);

            const button = new ButtonBuilder()
                .setStyle(1)
                .setLabel("Collect 0.25 money!")
                .setCustomId("click_claim_daily");

            const row = new ActionRowBuilder().addComponents(button);
            
            announcementChannel.send({ content: `||@everyone||`, embeds: [embed], components: [row] });
        } else {
            console.error(`[ERROR] Announcement channel with ID ${announcementChannelId} not found.`);
        }*/
        
        
        
        
        
        //🇺🇸 This code is used to delete all command slashes and recreates them.
        //🇫🇷 Ce code sert a supprimer toute les slash command et a les recrée.

        /*rest.put(Routes.applicationCommands(client.user.id), { body: [] })
            .then(() => console.log('I have removed all the slash commands!'))
            .catch(console.error);*/
            
            
            
            
            
            
            //🇺🇸 This code is used to make the bot leave the servers that it does not find in the database.
            //🇫🇷 Ce code sert a faire quitter le bot des serveur qu'il ne retrouve pas dans la base de donnée.
            
        /*client.guilds.cache.forEach(async (guild) => {
            if (guild.id !== '1164217821996257301' && guild.id !== '1200394330322505768') {
                const guildInDB = await Guild.findOne({ guildId: guild.id });
                if (!guildInDB) {
                    console.log(`[BOT] Leaving guild ${guild.name} (${guild.id}) as it is not found in the database.`);
                    guild.leave();
                }
            }
        });*/
        
    }
}