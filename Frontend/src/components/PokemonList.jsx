import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../redux/pokemonService";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";
import "./pokemon.css";

const PokemonList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokemon, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  // if (error) return <p className="error">{error}</p>;

  return (
    <div className="pokemon-container">
      <div className="header-bar">
        <h1 className="pokemon-title">Pokemon List</h1>
        <button className="add-btn" onClick={() => navigate("/add")}>
          + Add Pokemon
        </button>
      </div>

      {loading ? (
        <div>
          {" "}
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemon.map((item) => (
            <PokemonCard key={item._id} pokemon={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
