import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState(BASE_URL);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState();

  const [pokemonsNameList, setPokemonsNameList] = useState();

  useEffect(() => {
    let doCancel;
    setLoading(true);
    axios
      .get(currentPageUrl, {
        // CancelToken returns a Token which is already a function to cancel calls.
        cancelToken: new axios.CancelToken((c) => (doCancel = c)),
      })
      .then((res) => {
        setLoading(false);
        const { count, next, previous, results } = res.data;
        setTotalPokemons(count);
        setPrevPageUrl(previous);
        setNextPageUrl(next);
        setPokemonList(results);
      });
    // Calls every time useEffect is called, so it cleans old running requests.
    return () => doCancel();
  }, [currentPageUrl]);

/*   

  FIXME:  
  totalPokemons variable 
  in the first useEffect, we assign totalPokemons with setTotalPokemons 
  setTotalPokemons is async so the second useEffect below can't access to totalPokemons variable

  use totalPokemons to set the ?limit={totalPokemons}
*/ 
  useEffect(() => {
    const pokeNames = localStorage.getItem("pokemonsNameList");
    if (pokeNames) {
      setPokemonsNameList(pokeNames.split(","));
    } else {
      axios.get(BASE_URL + "?limit=3000").then((res) => {
        const pokeNames = res.data.results.map((result) => result.name);
        setPokemonsNameList(pokeNames);
        localStorage.setItem("pokemonsNameList", pokeNames);
      });
    }
  }, []);

  const goToPrevPage = () => setCurrentPageUrl(prevPageUrl);
  const goToNextPage = () => setCurrentPageUrl(nextPageUrl);

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemonList={pokemonList} />
      <Pagination
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </>
  );
}
