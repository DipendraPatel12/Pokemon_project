const Pokemon = require("../models/Pokemon");


const getAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: pokemon });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET single Pokémon
const getSinglePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);

    if (!pokemon) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon not found" });
    }

    return res.status(200).json({ success: true, data: pokemon });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid ID format" });
  }
};

// CREATE Pokémon
const createPokemon = async (req, res) => {
  try {
    const { name, breed, type, description } = req.body;

   
    if (!name || !breed || !type || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, breed, type, description) are required",
      });
    }

    const newPokemon = new Pokemon({ name, breed, type, description });
    await newPokemon.save();

    return res.status(201).json({
      success: true,
      message: "Pokemon created successfully",
      data: newPokemon,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE Pokémon
const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, breed, type, description } = req.body;

    if (!name || !breed || !type || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, breed, type, description) are required",
      });
    }

    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      id,
      { name, breed, type, description },
      { new: true, runValidators: true }
    );

    if (!updatedPokemon) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Pokemon updated successfully",
      data: updatedPokemon,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid ID format" });
  }
};

// DELETE Pokémon
const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pokemon.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Pokemon deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid ID format" });
  }
};

module.exports = {
  getAllPokemon,
  getSinglePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
