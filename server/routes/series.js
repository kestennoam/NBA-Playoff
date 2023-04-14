const express = require("express");
const router = express.Router();
const Series = require("../models/Series");
const axios = require("axios");

// ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~
router.get("/series", async (req, res) => {
  try {
    // log the name of the route and params
    console.log("req.route.path:", req.route.path);
    const series = await Series.find();
    res.json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // get series by id
// router.get("/series/:id", async (req, res) => {
//   try {
//     const series = await Series.findById(req.params.id);
//     res.json(series);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// get all series by round
router.get("/series/round/", async (req, res) => {
  try {
    console.log("req.route.path:", req.route.path);
    const resFromAxios = await axios.get("http://localhost:3001/app/round");
    const series = await Series.find({ round: resFromAxios.data });
    res.json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all series by round and bets of the series and user
router.get("/series/round/user/:user", async (req, res) => {
  try {
    console.log("req.route.path:", req.route.path);
    const resFromAxiosSeries = await axios.get("http://localhost:3001/app/round");
    const series = await Series.find({ round: resFromAxiosSeries.data });
    // todo improve efficieny
    const resFromAxiosBets = await axios.get(`http://localhost:3001/bets/user/${req.params.user}`);
    console.log("lior", resFromAxiosBets.data, req.params.user);
    return res.json({ series, betsOfUser: resFromAxiosBets.data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~
// create and update series
router.post("/series", async (req, res) => {
  console.log("req.body:", req.body);

  const series = new Series({
    firstTeam: req.body.firstTeam,
    secondTeam: req.body.secondTeam,
    round: req.body.round,
    score: req.body.score,
  });
  try {
    const newSeries = await series.save();
    console.log("newSeries:", newSeries);
    res.status(200).json(newSeries);
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ message: err.message });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ PATCH ~~~~~~~~~~~~~~~~~~~~~~~

// update winsFirstTeam and winsSecondTeam
router.patch("/series/:id", async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    console.log("series:", series);
    if (series == null) {
      return res.status(404).json({ message: "Cannot find series" });
    }
    if (req.body.winsFirstTeam != null) {
      series.winsFirstTeam = req.body.winsFirstTeam;
    }
    if (req.body.winsSecondTeam != null) {
      series.winsSecondTeam = req.body.winsSecondTeam;
    }
    console.log("series:", series);

    // check if one of the teams has 4 points -> if yes update all bets
    if (series.winsFirstTeam === 4 || series.winsSecondTeam === 4) {
      // log series is done
      console.log("series is done");
      // axios put request to update bets by series id
      // todo change the url to the deployed url
      // log url
      console.log(`http://localhost:3001/bets/series/${req.params.id}`);
      const bets = await axios.put(`http://localhost:3001/bets/series/${req.params.id}`, {
        winsFirstTeam: series.winsFirstTeam,
        winsSecondTeam: series.winsSecondTeam,
      });
      console.log("bets:", bets);

      // update series winner
      if (series.winsFirstTeam === 4) {
        console.log("winner:", series.firstTeam);
        series.winner = series.firstTeam;
      }
      if (series.winsSecondTeam === 4) {
        console.log("winner:", series.secondTeam);
        series.winner = series.secondTeam;
      }
    }
    const updatedSeries = await series.save();

    res.json(updatedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
