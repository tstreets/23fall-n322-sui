import React from 'react';
import { useRouter } from 'next/router';
import { Loader, Image } from 'semantic-ui-react';

export default function PokemonName() {
  const [pokemonInfo, setPokemonInfo] = React.useState({ loading: true });
  const router = useRouter();

  React.useEffect(function () {
    if (pokemonInfo.name !== router.query.name && router.query.name) {
      console.log('Load in pokemon info', router.query.name);
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`)
        .then((r) => r.json())
        .then(function (r) {
          setPokemonInfo(r);
        })
        .catch((e) => setPokemonInfo({ loading: false, name: router.query.name }));
    }
  });

  // console.log(router.query);

  return (
    <>
      <h1>Pokemon Name: {router.query.name}</h1>
      <Loader active={pokemonInfo.loading || pokemonInfo.name !== router.query.name} />
      {
        // if this statement
        pokemonInfo.id ? (
          // then do this; true
          <>
            <Image src={pokemonInfo.sprites.front_default}></Image>
          </>
        ) : (
          // else do this; false
          <>{isNaN(pokemonInfo.id) ? <h2>Searching for Pokemon</h2> : <h2>Pokemon Not Found</h2>}</>
        )
      }
    </>
  );
}
