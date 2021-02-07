import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
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

  const goToPrevPage = () => setCurrentPageUrl(prevPageUrl);
  const goToNextPage = () => setCurrentPageUrl(nextPageUrl);

  if (loading) return "Loading...";

  return (
    <>
      {totalPokemons && (
        <SearchBar BASE_URL={BASE_URL} totalPokemons={totalPokemons} />
      )}
      <PokemonList pokemonList={pokemonList} />
      <Pagination
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </>
  );
}
