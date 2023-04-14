// create team model with mongoose
// // define a team with name, score, id
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  east: { type: Boolean, required: true },
  rankRegularSeason: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
