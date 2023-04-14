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

// ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~
// create and update user
router.post("/users", async (req, res) => {
  console.log("posting saving user:", req.body);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    console.log("new user was saved:", newUser);
    res.status(201).json(newUser._id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
