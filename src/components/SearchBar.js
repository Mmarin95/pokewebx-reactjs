import React, { useState, useEffect } from "react";

// Do I need the useState or it is enough with localStorage/variable?
export default function SearchBar({ BASE_URL, totalPokemons }) {
  const [pokemonsNameList, setPokemonsNameList] = useState();
  const URL = BASE_URL + `?limit=${totalPokemons}`;
  useEffect(() => {
    const pokeNames = localStorage.getItem("pokemonsNameList");
    if (pokeNames) {
      setPokemonsNameList(pokeNames.split(","));
    } else {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const pokeNames = data.results.map((result) => result.name);
          setPokemonsNameList(pokeNames);
          localStorage.setItem("pokemonsNameList", pokeNames);
        });
    }
  }, [totalPokemons]);

  return <div></div>;
}
