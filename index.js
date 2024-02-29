const { Client, Collection, GatewayIntentBits, WebhookClient, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config");
const { apiConnect } = require("./lib/apiHandler");
const Guild = require("./models/Guild");
const User = require("./models/User");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  restTimeOffset: 0,
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MANAGE_GUILD", "MESSAGE", "REACTION"],
})

apiConnect(client);

client.commands = new Collection()

client.login(config.bot.token);

const eventFiles = readdirSync("./event").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
  const event = require(`./event/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args))
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args))
  }
}

process.on("unhandledRejection", (error) => {
  if (error.code == 10062) return; // Unknown interaction
  console.log(`[ERREUR] ${error}`);
})