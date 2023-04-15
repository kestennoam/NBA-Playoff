const mongoose = require("mongoose");

// define first name, last name, score, id
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  score: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  salt: { type: String, required: true },
});

// Create a model
const User = mongoose.model("User", userSchema);
// export it
module.exports = User;
