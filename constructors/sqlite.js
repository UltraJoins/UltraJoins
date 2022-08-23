const Discord = require('discord.js')
const db = require('quick.db');
const get = async (message, user) => {
  let data = {}
  let object_user_based = {
    coins: 0,
    logs: [],
    banned: false, 
    freecoins: 0
  } 
  let object_guild_based = {
    code: 0,
    orders: 0,
    uses: 0,
    record: [],
    serverLevel: 1,
    users: [],
  } 
  
  let object_guild_user_based = {
    joinedDate: 0,
    activity: 0 
  } 
  
  Object.entries(object_user_based).map(async x => {
    let variable = x[0]
    let value = x[1] 
    let item = await db.fetch(`${variable}_${user.id}`)
    
    if (item === null) data[variable] = value, db.set(`${variable}_${user.id}`, value)
    else data[variable] = item 
  }) 
  
  Object.entries(object_guild_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(`${variable}_${message.guild.id}`)
    if (item === null) db.set(`${variable}_${message.guild.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  Object.entries(object_guild_user_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(`${variable}_${message.guild.id}_${user.id}`)
    if (item === null) db.set(`${variable}_${message.guild.id}_${user.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  
  await new Promise(resolve => setTimeout(resolve, 1)) 
  
  return data
} 
module.exports = {
  get: get 
} 
