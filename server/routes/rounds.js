// router of /rounds with get all and create new

const express = require("express");
const router = express.Router();
const Round = require("../models/Round");

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/rounds", async (req, res) => {
  try {
    const rounds = await Round.find();
    res.json(rounds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~
// create and update round
router.post("/rounds", async (req, res) => {
  console.log("req.body:", req.body);
  const round = new Round({
    name: req.body.name,
    winnerScore: req.body.winnerScore,
    exactPointScore: req.body.exactPointScore,
  });
  try {
    const newRound = await round.save();
    console.log("newRound:", newRound);
    res.status(200).json(newRound);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
