const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bet = require("../models/Bet");
const Series = require("../models/Series");
const BetStatus = require("../enums/BetStatus");

// ~~~~~~~~~~~~~~~~~~~~~~ HELP ~~~~~~~~~~~~~~~~~~~~~~~
async function calculateBetScore(bet) {
    const series = await Series.findById(bet.series).populate("round");
    console.log("bet:", bet);
    console.log(BetStatus.WON.toString());
    if (bet.betStatus === BetStatus.WON.toString()) {
        return series.round.winnerScore;
    } else if (bet.betStatus === BetStatus.WON_EXACT.toString()) {
        return series.round.exactPointScore;
    } else {
        return 0;
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/users", async (req, res) => {
    try {
        console.log("fetching users")
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// get all user scores
router.get("/users/scores", async (req, res) => {
    try {
        // Find all users
        const users = await User.find();
        console.log("users:", users);
        // Initialize an empty object to store the scores for all users
        const scores = [];

        // Loop through each user
        for (const user of users) {
            // Find all bets for the user
            const bets = await Bet.find({user: user._id}).populate("series");

            // Initialize the user's score to 0
            let userScore = 0;

            // Loop through each bet
            for (const bet of bets) {
                // Add the bet score to the user's total score
                userScore = (await calculateBetScore(bet)) + userScore;
            }

            // add to scores user id, user name and user score
            console.log("user user", user._id, user.firstName, userScore);
            scores.push({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                score: userScore,
            });
        }

        // Send the scores object in the response
        res.json(scores);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
});

// get user by his id
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({message: "user not found"});
    }
});

// get user salt by his mail
router.get("/users/salt/:email", async (req, res) => {
    console.log("fetching salt");
    try {
        const data = await User.findOne({email: req.params.email}).select("salt");
        if (!data) {
            res.status(404).json({message: `user with email: <${req.params.email}> not found`});
        } else {
            const saltData = data.salt;
            res.send(saltData);
        }
    } catch (err) {
        res.status(404).json({message: "user salt not found"});
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
        salt: req.body.salt,
    });
    try {
        const newUser = await user.save();
        console.log("new user was saved:", newUser);
        // return user_id, first_name, last_name, email
        res.status(201).json({
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// create and update user
router.post("/users/:email/verify", async (req, res) => {
    try{
        console.log("posting saving user:", req.body);
        const user = await User.findOne({email: req.params.email});
        console.log("User: " + user);
        if (user.password === req.body.hashedPassword) {
            // return user_id, first_name, last_name, email
            res.status(201).json(user);
        } else {
            res.status(403).json({message: "Wrong password"});
        }
    }catch (e) {
        res.status(401).json({message: err.message});
    }

});


module.exports = router;
