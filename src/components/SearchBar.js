import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ BASE_URL, totalPokemons }) {
  const [pokemonsNameList, setPokemonsNameList] = useState();

  useEffect(() => {
    // const pokeNames = localStorage.getItem("pokemonsNameList");
    // if (pokeNames) {
    //   setPokemonsNameList(pokeNames.split(","));
    // } else {
      axios.get(BASE_URL + `?limit=${totalPokemons}`).then((res) => {
        const pokeNames = res.data.results.map((result) => result.name);
        setPokemonsNameList(pokeNames);
        localStorage.setItem("pokemonsNameList", pokeNames);
       });
    // }
  }, [totalPokemons]);

  return <div></div>;
}
