const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  winnerScore: { type: Number, required: true },
  exactPointScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// load round id by name
roundSchema.statics.loadByName = function (name) {
  return this.findOne({ name: name });
};

const Round = mongoose.model("Round", roundSchema);

module.exports = Round;
