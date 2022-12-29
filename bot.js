const http = require ('http');
const express = require('express');
const app = express();
const { RichEmbed } = require("discord.js");
const config = require('./config.json');
const { default_prefix } = require("./config.json");
const emoji = require('./emoji.json');
const Discord = require('discord.js');
var cron = require('node-cron');
 const client = new Discord.Client({ fetchAllMembers: false, messageCacheMaxSize: 5 });
const db = require('quick.db');
const fs = require('fs');







client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands/General').filter(file => file.endsWith(".js")); 

for (const commands of files) {
  const command = require(`./commands/General/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 

const files3 = fs.readdirSync('./commands/Admin').filter(file => file.endsWith(".js")); 

for (const commands of files3) {
  const command = require(`./commands/Admin/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 

const files2 = fs.readdirSync('./commands/Owner').filter(file => file.endsWith(".js"));

for (const commands of files2) {
  const command = require(`./commands/Owner/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 

const vip = fs.readdirSync('./commands/VIP').filter(file => file.endsWith(".js"));

for (const commands of vip) {
  const command = require(`./commands/VIP/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 

client.on("ready", async () => {
  const event = require('./events/ready.js').execute(client, db) 
})
client.on("message", async message => {


let prefix = db.get(`prefix_${message.guild.id}`); if (prefix === null) prefix = default_prefix;

  
  try {
  const event = require('./events/message.js').execute(client, message, prefix, db) 
  } catch(e) {
    return message.channel.send(e.message) 
  } 
})



client.on("message", msg =>{
  const emmbed = new Discord.MessageEmbed()
    .setColor(`#2f3136`)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
    .setDescription(`My prefix is : \`${config.prefix}\`\nUse \`${config.prefix}help\` help page.`)
    
  if(msg.content === `<@>`){
    msg.channel.send(emmbed);
  }
})





client.on("shardReady", (shardID) => {
    
  if (shardID === 2){
          const poststats = async () => {
              const BOATS = require('boats.js');
              const fetch = require('node-fetch');
          let guildsCounts = await client.shard.fetchClientValues("guilds.cache.size");
          let guildsCountss = guildsCounts[0] + guildsCounts[1] + guildsCounts[2];
          fetch(`https://infinitybotlist.com/api/bots/`, {
              method: "POST",
              headers: {
                  Authorization: "*****",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  "servers": guildsCountss,
                  "shards": '1337'
              })
          })
   }
   poststats();

  }
  const shardlog = new Discord.WebhookClient('994540890116866068', 'Wg8GnNhbRJ2N3gT-JcW2MCIFsSC-keNtGpdfFdZyHOafaGY5zKBGEVK6vcqRLjamSE1U');
  const postMessage = `${emoji.online} | Shard #${shardID} is ready!`;
  shardlog.send(postMessage);
});
client.on("shardDisconnect", (shardID) => {
  const shardlog = new Discord.WebhookClient('994540890116866068', 'Wg8GnNhbRJ2N3gT-JcW2MCIFsSC-keNtGpdfFdZyHOafaGY5zKBGEVK6vcqRLjamSE1U');
  const postMessage = `${emoji.load} | Shard #${shardID} is disconnected...`;
  shardlog.send(postMessage);
  
});
client.on("shardReconnecting", (shardID) => {
  const shardlog = new Discord.WebhookClient('994540890116866068', 'Wg8GnNhbRJ2N3gT-JcW2MCIFsSC-keNtGpdfFdZyHOafaGY5zKBGEVK6vcqRLjamSE1U');
  const postMessage = `${emoji.inactif} | Shard #${shardID} is reconnecting...`;
  shardlog.send(postMessage);
});
client.on("shardResume", (shardID) => {
  const shardlog = new Discord.WebhookClient('994540890116866068', 'Wg8GnNhbRJ2N3gT-JcW2MCIFsSC-keNtGpdfFdZyHOafaGY5zKBGEVK6vcqRLjamSE1U');
  const postMessage = `${emoji.online} | Shard #${shardID} has resumed!`;
  shardlog.send(postMessage);
});




client.on("guildMemberAdd", async member => {
  const event = require('./events/guildMemberAdd.js').execute(client, member, db) 
})
client.on("guildMemberRemove", async member => {
  const event = require('./events/guildMemberRemove.js').execute(client, member, db) 
})

client.on("guildCreate", async guild => {
  console.log("[Event] -> New guild") 
  const event = require('./events/guildCreate.js').execute(client, guild) 
}) 

client.on("guildDelete", async guild => {
  console.log("[Event] -> Left guild") 
  const event = require('./events/guildDelete.js').execute(client, guild) 
}) 


client.login(config.token1)
