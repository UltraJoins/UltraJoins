const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
  },
  buyer: {
    type: String,
  },
  orders: {
    type: Number,
    default: 0,
  },
  uses: {
    type: Number,
    default: 0,
  },
  records: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Guild = mongoose.model("Guild", guildSchema);

module.exports = Guild;