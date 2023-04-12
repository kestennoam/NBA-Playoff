require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users"); // Import the users router

const PORT = 3001;

// mongodb connection
// print mongo uri
console.log("process.env.MONGODB_URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app
app.use(cors({ origin: "*" }));

// get users api
app.get("/users", userRoutes);

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
