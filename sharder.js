const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');



const manager = new ShardingManager('./bot.js', {
    token: token,
    totalShards: 1
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));



//=========================

//Start dashboard (No Github)

//const dash = new ShardingManager('./dash/run.js', {
    //token: token,
    //totalShards: 1
//});

//dash.spawn();
//dash.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));
