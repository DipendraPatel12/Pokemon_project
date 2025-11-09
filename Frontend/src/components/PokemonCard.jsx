import React from "react";
import { useDispatch } from "react-redux";
import { deletePokemon } from "../redux/pokemonService";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Delete ${pokemon.name}?`)) {
      dispatch(deletePokemon(pokemon._id));
    }
  };

  const handleEdit = () => {
    navigate(`/add`, { state: pokemon });
  };

  return (
    <div className="card">
      <h3>{pokemon.name}</h3>
      <p>
        <strong>Breed:</strong> {pokemon.breed}
      </p>
      <p className="desc">{pokemon.description}</p>

      <div className="btn-group">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
