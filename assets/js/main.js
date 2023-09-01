
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0;

const maxRecords = 151

function convertPokemonToLi(pokemon) {

    const name = pokemon.name
    const number = pokemon.number
    const image = pokemon.img
    const type = pokemon.type

    return `<li onclick="getPokemonInfo(${number})" class="pokemon ${type}">
    <span class="number">#${number}</span>
    <span class="name">${name}</span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${image}" alt="${name}">
    </div>

    </li></a>`
}

function getPokemonInfo(number){
    console.log(`Pokémon Número: ${number}`)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit)
    }

    
})



