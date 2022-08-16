const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
  execute: async(client) => {
   
    console.log(`UltraJoins and connect`)
    client.user.setPresence({ status: "online", activity:{name: `${config.statusbot1}`, type: "WATCHING" }});
        setInterval(() => {
            client.user.setPresence({ status: "online", activity:{name: `${config.statusbot2}`, type: "WATCHING" }});
        }, 60000*60);
		

  } 
}



