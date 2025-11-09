import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);

      if (response.data?.data) {
        return response.data.data;
      }

      return response.data;
    } catch (error) {
      console.log("Fetch Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addPokemon = createAsyncThunk(
  "pokemon/addPokemon",
  async (pokemonData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePokemon = createAsyncThunk(
  "pokemon/updatePokemon",
  async ({ id, pokemonData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePokemon = createAsyncThunk(
  "pokemon/deletePokemon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
