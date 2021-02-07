import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      setPokemonList(res.data.results);
    });
  }, []);

  return <PokemonList pokemonList={pokemonList} />;
}

export default App;
