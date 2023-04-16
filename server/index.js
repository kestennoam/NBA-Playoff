require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const seriesRoutes = require("./routes/series");
const betRoutes = require("./routes/bets");
const roundRoutes = require("./routes/rounds");
const appRoutes = require("./routes/apps");

const PORT = 3001;

// mongodb connection
console.log("process.env.MONGODB_URI:", process.env.MONGODB_URI);
const mongo_connection =
  process.env.MONGODB_URI || "mongodb+srv://noamkesten:tJRppKDQlrBF7CkS@nbaplayoff.pgzbags.mongodb.net/test";

mongoose.connect(mongo_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app
app.use(cors());
app.use(express.json());

// routes
// GET
app.get("/users", userRoutes);
app.get("/users/scores", userRoutes);
app.get("/users/:id", userRoutes);
app.get("/series", seriesRoutes);
app.get("/series/round", seriesRoutes);
app.get("/series/round/user/:user", seriesRoutes);
app.get("/bets", betRoutes);
app.get("/bets/user/:id", betRoutes);
app.get("/bets/user/:user/series/:series", betRoutes);
app.get("/rounds", roundRoutes);
app.get("/app", appRoutes);
app.get("/app/round", appRoutes);

// POST
app.post("/series", seriesRoutes);
app.post("/bets", betRoutes);
app.post("/rounds", roundRoutes);
app.post("/app", appRoutes);
app.post("/users", userRoutes);

// PATCH
app.patch("/series/:id", seriesRoutes);
app.patch("/bets/:id", betRoutes);
app.patch("/rounds/:id", roundRoutes);
app.patch("/app", appRoutes);

// PUT
app.put("/series/:id", seriesRoutes);
app.put("/bets/:id", betRoutes);
app.put("/bets/series/:id", betRoutes);
app.put("/rounds/:id", roundRoutes);

// delete
app.delete("/bets/user/:userID/series/:id", betRoutes);

// App
app.get("", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, async () => {
  try {
    console.log("Server running on port", PORT);
  } catch (error) {
    console.log("error:", error);
  }
});
