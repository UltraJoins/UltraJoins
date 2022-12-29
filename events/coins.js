module.exports = {
  execute: async(message, db) => {
   
    if (await db.fetch(`banned_${message.author.id}`)) return
    
    let coins = await db.fetch(`coins_${message.author.id}`)
    
    if (coins === null) return
    
    if (message.guild.ownerID === message.author.id) return
    
    let freecoins = await db.fetch(`freecoins_${message.author.id}`)
    let serverLevel = await db.fetch(`serverLevel_${message.guild.id}`) 
    let logs = await db.fetch(`logs_${message.author.id}`)
    
    let timeout = 300000
    
    if (freecoins !== null && timeout - (Date.now() - freecoins) > 1) return 
        
    if (logs === null) logs = []
    logs.unshift(`[+${(serverLevel / 20 + 0.05).toFixed(2)}] - Activity reward on ${message.guild.name}.`), db.set(`logs_${message.author.id}`, logs)
    
    db.add(`coins_${message.author.id}`, serverLevel / 20 + 0.05).catch(e => {}) 
    db.set(`activity_${message.guild.id}_${message.author.id}`, 0)
    
    db.set(`freecoins_${message.author.id}`, Date.now()) 
  } 
} 