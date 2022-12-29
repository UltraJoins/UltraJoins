const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');
const emoji = require('../../emoji.json');

module.exports = {
    name: "giftcode",
    description: "",
    execute: async(client, message, args, data, db) => {

      if(args[0] == 'create') {

        let COINS = Number(args[1])
        if (!COINS || isNaN(COINS) || COINS < 1) return message.channel.send(`${emoji.error} Invalid order!\nTo purchase a gift card, type \`+giftcode create <NumberOfCoins> <Code>\``)
        if (COINS > data.coins) return message.channel.send(`${emoji.error} I tried to find your balance... But you didn\'t have enough coins.\n*Try to join some servers*` )
        COINS = Math.round(COINS)

      let CODE = args[2]
      message.reply(`[GiftCode] -> Check your private message!`)
      message.delete()
      let embed = new Discord.MessageEmbed()
   
      
      .addField(`Giftcode:`, `${CODE}`, false)
      .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
          .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setColor("#2f3136")
      
      message.author.send(embed)
      await new Promise(resolve => setTimeout(resolve, 100))
      db.add(`code_` + CODE, COINS)
      db.subtract(`coins_${message.author.id}`, Number(COINS))
      data.logs.unshift(`[-${COINS}] - Creation of a gift card.`)

      db.set(`logs_${message.author.id}`, data.logs)

      } else if(args[0] === 'redeem') {
        REDEEMINGCODE = args[1]
        let COINSTOADD = db.fetch(`code_` + REDEEMINGCODE)
        if (COINSTOADD == null || COINSTOADD == 0) {
              message.channel.send('This code has already been used or is not valid!')
            } else {
                const redeemed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                   .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
                .setDescription(`${emoji.premium} You just got \`${COINSTOADD}\` coins!`)
                message.channel.send(redeemed)
          data.logs.unshift(`[+${COINSTOADD}] - Claiming a gift code.`)
          db.set(`logs_${message.author.id}`, data.logs)
          db.add(`coins_${message.author.id}`, COINSTOADD)
          db.subtract(`code_` + REDEEMINGCODE, COINSTOADD)
            }
        } else {
          let helpembed = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`\`+giftcode create <10> <MyCode>\`: If you want to offer a kdo card to a friend\n\`+giftcode redeem <MyCode>\`: To recover a kdo code`)
          .setImage("https://images-ext-1.discordapp.net/external/xLBZF3gHJcPGaud876J8e7o54faDPkt-e44UTPPxTv4/https/share.creavite.co/m6sxxOQg6llRnrME.gif")
          
          
          .setColor('#2f3136')
        message.channel.send(helpembed)
        }
    
     }

  }