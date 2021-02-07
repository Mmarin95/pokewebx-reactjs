import React from "react";

export default function PokemonList({ pokemonList }) {
  return (
    <div>
      <ul>
        {pokemonList.map((poke) => (
          <li key={poke.name}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}
