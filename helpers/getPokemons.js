export const getPokemons = async() =>{
    const URL_API = 'https://pokeapi.co/api/v2/pokemon?limit=500'
    const response = await axios.get(URL_API)
    const promises = response.data.results.map(async(element) => {
        const dataList = await axios.get(element.url)
        return dataList.data
    });
    return promises
}