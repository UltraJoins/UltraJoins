const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
  execute: async(client) => {
   
    console.log(`UltraJoins and connect`)
    client.user.setPresence({ status: "online", activity:{name: `${config.status}`, type: "WATCHING" }});
  } 
}



