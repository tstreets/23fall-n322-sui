import React from 'react';
import { useRouter } from 'next/router';
import { Loader, Image, Header, Grid } from 'semantic-ui-react';

export default function PokemonName() {
  const [pokemonInfo, setPokemonInfo] = React.useState({ loading: true, stats: [] });
  const router = useRouter();

  React.useEffect(function () {
    if (pokemonInfo.name !== router.query.name && router.query.name) {
      console.log('Load in pokemon info', router.query.name);
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`)
        .then((r) => r.json())
        .then(function (r) {
          setPokemonInfo(r);
        })
        .catch((e) => setPokemonInfo({ loading: false, name: router.query.name, stats: [] }));
    }
  });

  console.log(pokemonInfo);

  // console.log(router.query);

  const pokemonStats =
    pokemonInfo.stats.length === 0
      ? []
      : pokemonInfo.stats.map((stat) => {
          return (
            <Grid.Column key={stat.stat.name}>
              <Header as='h3'>{stat.stat.name}</Header>
              <p>{stat.base_stat}</p>
            </Grid.Column>
          );
        });

  /*
  const stat = {
    "base_stat": 40,
    "effort": 0,
      "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
      }
  }
  */

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
            <Grid columns='3'>{pokemonStats}</Grid>
          </>
        ) : (
          // else do this; false
          <>{isNaN(pokemonInfo.id) ? <h2>Searching for Pokemon</h2> : <h2>Pokemon Not Found</h2>}</>
        )
      }
    </>
  );
}
