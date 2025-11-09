import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemon, addPokemon, updatePokemon, deletePokemon } from "./pokemonService";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(addPokemon.fulfilled, (state, action) => {
        state.pokemon.unshift(action.payload);
      })

   
      .addCase(updatePokemon.fulfilled, (state, action) => {
        const index = state.pokemon.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.pokemon[index] = action.payload;
      })

      .addCase(deletePokemon.fulfilled, (state, action) => {
        state.pokemon = state.pokemon.filter(p => p._id !== action.payload);
      });
  },
});

export default pokemonSlice.reducer;
