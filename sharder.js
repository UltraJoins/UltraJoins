const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

const manager = new ShardingManager('./index.js', {
    token: token,
    totalShards: 'auto'
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} connect`));
