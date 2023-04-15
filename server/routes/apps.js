const express = require("express");
const router = express.Router();
const App = require("../models/App");

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/app", async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get app/round
router.get("/app/round", async (req, res) => {
  try {
    console.log("Noam");
    const app = await App.findOne();
    res.json(app.round);
  } catch (err) {
    res.status(404).json({ message: "app not found" });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~
// create and update app
router.post("/app", async (req, res) => {
  console.log("req.body:", req.body);
  const app = new App({
    round: req.body.round,
  });
  try {
    const newApp = await app.save();
    console.log("newApp:", newApp);
    res.status(200).json(newApp);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ PATCH ~~~~~~~~~~~~~~~~~~~~~~~
// update app
router.patch("/app", async (req, res) => {
  // find one
  const app = await App.findOne();
  // update
  app.round = req.body.round;
  // save
  try {
    const updatedApp = await app.save();
    res.json(updatedApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
