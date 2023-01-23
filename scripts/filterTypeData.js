import { renderData } from "./filterNameData.js";
const pokemonInfo = document.getElementById('pokemon-info-container');
const renderType = (data, type) => {
    return data.filter((elem) => elem.types[0].type.name.includes(type))
}
export const rendArrays = async (name) => {
    const renderDat = await renderData(name);
    const { filterPokemons, allData } = renderDat;
    let data = filterPokemons[0];
    let types = []
    let typePokemons;
    allData.forEach(elem => {
        if (!types.includes(elem.types[0].type.name)) {
            types.push(elem.types[0].type.name)
        }
    })
    if (types.includes(name)) {
        typePokemons = allData.filter(element => element.types[0].type.name == name.toLowerCase())
        data = typePokemons[0]
    } else {
        if (filterPokemons.length !== 0) {
            typePokemons = renderType(allData, data.types[0].type.name)
        } else {
            pokemonInfo.innerHTML += `<p style ="font-weight:800; font-size:35px; color:red; ">NOT FOUND</p>`
        }
    }
    return {
        typePokemons,
        data,
        types
    }
}