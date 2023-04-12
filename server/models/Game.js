// create an nba game schema with mongoose between the two teams, the score, and the date
const mongoose = require("mongoose");

// define first name, last name, score, id
const gameSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: Number,
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model
const User = mongoose.model("Game", gameSchema);
// export it
module.exports = Game;
