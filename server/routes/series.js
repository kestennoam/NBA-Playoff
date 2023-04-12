const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/series", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get series by id
router.get("/series/:id", async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    res.json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
