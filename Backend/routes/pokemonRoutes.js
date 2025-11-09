const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.post("/pokemon", pokemonController.createPokemon);
router.get("/pokemon", pokemonController.getAllPokemon);
router.get("/pokemon/:id", pokemonController.getSinglePokemon);
router.put("/pokemon/:id", pokemonController.updatePokemon);
router.delete("/pokemon/:id", pokemonController.deletePokemon);

module.exports = router;
