const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get user by his id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "user not found" });
  }
});

// get user score from all bets from all score of the series and then load the score from round
// router.get("/users/score/:id", async (req, res) => {
//     try {

module.exports = router;
