import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState(BASE_URL);
  const [nextPageList, setNextPagelist] = useState();
  const [prevPageList, setPrevPagelist] = useState();

  useEffect(() => {
    let doCancel;
    axios
      .get(currentPageUrl, {
        // CancelToken returns a Token which is already a function to cancel calls.
        cancelToken: new axios.CancelToken((c) => (doCancel = c)),
      })
      .then((res) => {
        console.log(res.data);
        const { count, next, prev, results } = res.data;
        if (!totalPokemons) setTotalPokemons(count);
        setNextPagelist(next);
        setPrevPagelist(prev);
        setPokemonList(results);
      });
    // Calls every time useEffect is called, so it cleans old requests.
    return () => doCancel();
  }, [currentPageUrl]);

  return <PokemonList pokemonList={pokemonList} />;
}

export default App;
