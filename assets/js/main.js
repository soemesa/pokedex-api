const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 150
const limit = 10
let offset = 0

let pokemons

async function loadPokemonItens(offset, limit) {
    pokemons = await pokeApi.getPokemons(offset, limit)
    
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `).join('') 

    pokemonList.innerHTML += newHtml

    /*const pokemonItens = document.querySelectorAll('.pokemon');

    pokemonItens.forEach((pokemonItem) => {
        pokemonItem.addEventListener('click', async () => {
            const pokemonName = pokemonItem.querySelector('.name').textContent
            const clickedPokemon = pokemons.find((p) => p.name === pokemonName)

            
            if (clickedPokemon) {
                window.location.href = `pokemon.html?pokemonName=${clickedPokemon.name}`;
                //window.location.href = `pokemon.html?${clickedPokemon.name}`
            }
        })
    })  */
}

function handlePokemonClick(pokemonItem) {
    const pokemonName = pokemonItem.querySelector('.name').textContent
    const clickedPokemon = pokemons.find((p) => p.name === pokemonName)

    if (clickedPokemon) {
        window.location.href = `pokemon.html?pokemonName=${clickedPokemon.name}`;
        //window.location.href = `pokemon.html?${clickedPokemon.name}`
    }

    const pokemonItens = document.querySelectorAll('.pokemon');
    pokemonItens.forEach(handlePokemonClick)
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }
})




      