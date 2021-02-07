import React from "react";

export default function PokemonList({ pokemonList }) {
  return (
    <div>
      <ul>
        {pokemonList.map((poke) => (
          <li key={poke.name}>
            <a href={poke.url}>{poke.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
