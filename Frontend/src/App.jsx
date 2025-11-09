import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import AddPokemon from "./components/AddPokemon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/add" element={<AddPokemon />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
