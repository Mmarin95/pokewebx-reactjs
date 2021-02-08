import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
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
    setLoading(true);
    fetch(currentPageUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const { count, next, previous, results } = data;
        setTotalPokemons(count);
        setPrevPageUrl(previous);
        setNextPageUrl(next);
        setPokemonList(results);
      });
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
