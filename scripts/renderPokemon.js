import { rendArrays } from "./filterTypeData.js";
const pokemonInfo = document.getElementById('pokemon-info-container');
export const rendPokemon = async (name) =>{
    const arrays = await rendArrays(name);
    const {typePokemons, data} = arrays
    pokemonInfo.innerHTML = `
                <section id="pokemon-container">
                    <h1><img src='./img/${data.types[0].type.name}.png' alt="type" id="typeLogo">${data.name}</h1>
                    <figure>
                    <img src="${data.sprites.other.home.front_default}" alt="pokemon" id="pokemon">
                    </figure>
                </section>
                <section id="pokemon-info">
                    <div>
                        <p>NO.</p>
                        <p>${data.order}</p>
                    </div>
                    <div>
                        <p>LEVEL</p>
                        <p>${data.base_experience}</p>
                    </div>
                    <div>
                        <p>TYPE</p>
                        <p>${data.types[0].type.name.toUpperCase()}</p>
                    </div>
                    <div>
                        <p>HABILITY</p>
                        <p>${data.abilities[0].ability.name}</p>
                    </div>
                    <div>
                        <p>HEIGHT</p>
                        <p>${data.height} m</p>
                    </div>
                    <div>
                        <p>WEIGHT</p>
                        <p>${data.weight} kg</p>
                    </div>
                </section>
                `
}