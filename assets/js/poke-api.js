
const pokeApi = {}

function convertPokeApiDetailtToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id.toString().padStart(3, '0')
    pokemon.img = pokeDetail.sprites.other["official-artwork"].front_default

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailtToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonDetails) => pokemonDetails)


        .catch((error) => console.log(error))
}
