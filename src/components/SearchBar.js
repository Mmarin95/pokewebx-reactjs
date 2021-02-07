import React, { useState, useEffect } from "react";
import axios from "axios";

// Do I need the useState or it is enough with localStorage/variable?
export default function SearchBar({ BASE_URL, totalPokemons }) {
  const [pokemonsNameList, setPokemonsNameList] = useState();
  const URL = BASE_URL + `?limit=${totalPokemons}`;
  useEffect(() => {
    const pokeNames = localStorage.getItem("pokemonsNameList");
    if (pokeNames) {
      setPokemonsNameList(pokeNames.split(","));
    } else {
      axios.get(URL).then((res) => {
        const pokeNames = res.data.results.map((result) => result.name);
        setPokemonsNameList(pokeNames);
        localStorage.setItem("pokemonsNameList", pokeNames);
      });
    }
  }, [totalPokemons]);

  return <div></div>;
}
