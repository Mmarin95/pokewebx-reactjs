import React from "react";

export default function PokemonList({ pokemonList }) {
  return (
    <div className="pokemon-list">
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
