const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  accessToken: {
    type: String,
  },
  coins: {
    type: Number,
    default: 1,
  },
  joinedGuild: {
    type: Number,
    default: 0,
  },
  publishedAds: {
    type: Number,
    default: 0,
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  logs: {
    type: [String],
    default: [],
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;