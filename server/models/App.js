// app model
const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  round: { type: mongoose.Schema.Types.ObjectId, ref: "Round" },
});

const App = mongoose.model("App", appSchema);
module.exports = App;
