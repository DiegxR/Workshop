import { getPokemons } from "../helpers/getPokemons.js";
export const renderData = async (name = "") => {
    const promises = await getPokemons()
    const allData = await Promise.all(promises)
    let filterPokemons = allData.filter(data => data.name.includes(name.toLowerCase()))
    return {
        filterPokemons,
        allData
    }
}