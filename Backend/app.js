const express = require("express");
const cors = require("cors");

const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", pokemonRoutes);

app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

module.exports = app;
