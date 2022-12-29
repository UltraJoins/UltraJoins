const Discord = require('discord.js')

module.exports = {
  execute: async(client) => {
   
    console.log(`UltraJoins and connect`)
    client.user.setPresence({ status: "online", activity:{name: `+help - +farm ☕`, type: "WATCHING" }});
        setInterval(() => {
            client.user.setPresence({ status: "online", activity:{name: `☕ .gg/ultrajoins `, type: "WATCHING" }});
        }, 60000*60);
		

  } 
}



