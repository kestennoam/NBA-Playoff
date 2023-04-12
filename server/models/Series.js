// series between two teams with array of games and winner
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  firstTeam: { type: String, required: true },
  secondTeam: { type: String, required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  winner: { type: String },
  winsFirstTeam: { type: Number },
  winsSecondTeam: { type: Number },
  level: { type: String }, // todo change to enum
  score: { type: Number },
  lastTimeForChange: { type: Timestamp }, // todo ensure if it is a timestamp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model
const Series = mongoose.model("Series", seriesSchema);
// export it
module.exports = Series;
