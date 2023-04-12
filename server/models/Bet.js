// define a bet of a user on a series winsFirstTeam and winsSecondTeam
const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  series: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
  betWinsFirstTeam: { type: Number },
  betWinsSecondTeam: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model
const Bet = mongoose.model("Bet", betSchema);
// export it
module.exports = Bet;
