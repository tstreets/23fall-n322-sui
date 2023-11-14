import React from 'react';
import { useRouter } from 'next/router';

export default function PokemonName() {
    const router = useRouter();

    // console.log(router.query);

    return (
        <>
            <h1>Pokemon Name: {router.query.name}</h1>
        </>
    )
}