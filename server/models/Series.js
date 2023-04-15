const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  firstTeam: { type: String, required: true },
  secondTeam: { type: String, required: true },
  round: { type: mongoose.Schema.Types.ObjectId, ref: "Round", required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  winner: { type: String, default: "No Winner Yet" },
  winsFirstTeam: { type: Number, default: 0 },
  winsSecondTeam: { type: Number, default: 0 },
  // lastTimeForChange should be time and optional
  lastTimeForChange: { type: Date, default: Date.now },
  couldBeChanged: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model
const Series = mongoose.model("Series", seriesSchema);
// export it
module.exports = Series;
