const express = require("express");
const router = express.Router();
const Bet = require("../models/Bet");
const BetStatus = require("../enums/BetStatus");

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/bets", async (req, res) => {
  try {
    const bets = await Bet.find();
    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get bet by id
router.get("/bets/:id", async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    res.json(bet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a bet of a series by user id and seried id
router.get("/bets/user/:user/series/:series", async (req, res) => {
  try {
    console.log("req.params.user:", req.params.user);
    console.log("req.params.series:", req.params.series);
    const bet = await Bet.findOne({ user: req.params.user, series: req.params.series });
    res.json(bet);
  } catch (err) {
    res.status(404).json({ message: `couldn't find user: ${req.params.user}, and series ${req.params.series}` });
  }
});

// get all bets of a user
router.get("/bets/user/:id", async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.params.id });
    console.log("bets:", bets);
    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~
// create and update bet
router.post("/bets", async (req, res) => {
  console.log("req.body:", req.body);
  const bet = new Bet({
    user: req.body.user,
    series: req.body.series,
    betWinsFirstTeam: req.body.betWinsFirstTeam,
    betWinsSecondTeam: req.body.betWinsSecondTeam,
  });
  try {
    const newBet = await bet.save();
    console.log("new bet was saved:", newBet);
    res.status(200).json(newBet);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ PUT ~~~~~~~~~~~~~~~~~~~~~~~
// update all bets by series id
router.put("/bets/series/:id", async (req, res) => {
  try {
    console.log("~~~~~~~~~~~~~~~~~~~~~ ");
    console.log("req.route.path:", req.route.path);
    console.log("req.body:", req.body);
    const bets = await Bet.find({ series: req.params.id });
    if (bets == null) {
      return res.status(404).json({ message: "Cannot find bets" });
    }
    // update the bet to win_exact or win or lost
    bets.forEach((bet) => {
      console.log(1, BetStatus);
      console.log("bet.betWinsFirstTeam:", bet.betWinsFirstTeam);
      console.log("bet.betWinsSecondTeam:", bet.betWinsSecondTeam);
      console.log("req.body.winsFirstTeam:", req.body.winsFirstTeam);
      console.log("req.body.winsSecondTeam:", req.body.winsSecondTeam);
      console.log("bet:", bet);
      console.log("bet.betStatus::", bet.betStatus);
      console.log("BetStatus.WIN_EXACT:", BetStatus.WON_EXACT);
      console.log("BetStatus.WIN:", BetStatus.WON);
      console.log("BetStatus.LOST:", BetStatus.LOST);

      if (bet.betWinsFirstTeam === req.body.winsFirstTeam && bet.betWinsSecondTeam === req.body.winsSecondTeam) {
        bet.betStatus = BetStatus.WON_EXACT;
      } else if (bet.betWinsFirstTeam === req.body.winsFirstTeam || bet.betWinsSecondTeam === req.body.winsSecondTeam) {
        bet.betStatus = BetStatus.WON;
      } else {
        bet.betStatus = BetStatus.LOST;
      }
      console.log("bet.status:", bet.betStatus);
      bet.save();
      console.log("bet:", bet);
    });
    console.log("updatedBets:", bets);
    res.status(200).json(bets);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

// update the bet by end of series
router.put("/bets/:id", async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (bet == null) {
      return res.status(404).json({ message: "Cannot find bet" });
    }
    // update the bet to win_exact or win or lost
    if (bet.betWinsFirstTeam === req.body.winner && bet.betWinsSecondTeam === req.body.winner) {
      bet.status = BetStatus.WIN_EXACT;
    } else if (bet.betWinsSecondTeam === req.body.winner || bet.betWinsFirstTeam === req.body.winner) {
      bet.status = BetStatus.WIN;
    } else {
      bet.status = BetStatus.LOST;
    }
    const updatedBet = await bet.save();
    console.log("updatedBet:", updatedBet);
    res.status(200).json(updatedBet);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~~~~
router.delete("/bets/user/:userID/series/:seriesID", async (req, res) => {
  try {
    console.log(`deleting bets of user: ${req.params.userID} and series: ${req.params.seriesID}`);
    const deletedBets = await Bet.deleteMany({ user: req.params.userID, series: req.params.seriesID });
    console.log(
      `deleted ${deletedBets.deletedCount} bets of user: ${req.params.userID} and series: ${req.params.seriesID}`
    );
    res.status(200).json({ message: "Deleted bets" });
  } catch (err) {
    console.log(`couldn't delete bets of user: ${req.params.userID} and series: ${req.params.seriesID}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
