const mongoose = require("mongoose");

const cooldownSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  time: {
    type: Date,
  },
});

const Cooldown = mongoose.model("Cooldown", cooldownSchema);

module.exports = Cooldown;