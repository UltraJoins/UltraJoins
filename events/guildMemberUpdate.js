const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json')

modules.exports = async (client, oldMember, newMember) => {
    //Boost
    if (!oldMember.premiumSince && newMember.premiumSince) {
        return client.channels.cache.get(`${config.boostchannel}`).send(`Yoo! **${newMember.user.tag}** just boosted the server! Thank you, mate!`)
    }
    db.add(`coins_${message.author.id}`, 50) 
    data.logs.unshift(`[+50] - Boosters!`)
    db.set(`logs_${message.author.id}`, data.logs)
}