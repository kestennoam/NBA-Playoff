const mongoose = require("mongoose");
const BetStatus = require("../enums/BetStatus");

const betSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  series: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
  betWinsFirstTeam: { type: Number },
  betWinsSecondTeam: { type: Number },
  betStatus: { type: String, enum: Object.values(BetStatus), default: BetStatus.PENDING.toString() },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Bet = mongoose.model("Bet", betSchema);
module.exports = Bet;
