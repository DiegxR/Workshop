import { getPokemons } from "./helpers/getPokemons.js"
const pokemonInfo = document.getElementById('pokemon-info-container')
const others = document.getElementById('others');
const renderType = (data, type) =>{
    return data.filter((elem)=> elem.types[0].type.name.includes(type))
} 
const rend = async(name="") =>{
    const promises = await getPokemons()
    const allData = await Promise.all(promises)
    let filterPokemons = allData.filter(data => data.name.includes(name.toLocaleLowerCase()))
    let data = filterPokemons[0];
    let typePokemons;
    const types = []
     allData.forEach(elem=>{
        if(!types.includes(elem.types[0].type.name)){
            types.push(elem.types[0].type.name)
        }
     })
     if(types.includes(name) ){
        typePokemons = allData.filter(element => element.types[0].type.name == name.toLowerCase())
        data = typePokemons[0]
     }else{
         if(filterPokemons.length !== 0 ){
            typePokemons = renderType(allData, data.types[0].type.name)
        }else{
            pokemonInfo.innerHTML += ` <p style ="font-weight:800; font-size:35px; color:red; ">NOT FOUND</p> `
        }
     }
    console.log(types)
   
    console.log(typePokemons)
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
                
                let count = 0
                let checkedA = []
                let checkedB = []
                others.innerHTML = ""
            if(types.includes(name)){
                typePokemons.forEach((elem, index) =>{
                    if((elem.id !== data.id) && count<4){
                        others.innerHTML +=
                            `<img src="${elem.sprites.front_default}" id="${elem.name}">`
                            count ++
                    }
                })   
            }else{
                typePokemons.forEach((elem, index) =>{
                    filterPokemons.forEach((element, ind)=>{
                        if(elem.name == element.name){
                            checkedA.push(index)
                        }
                        if(element.id !== data.id){
                            checkedB.push(ind)
                        }
                    })
                })
            filterPokemons.forEach((element, ind)=>{
                if(checkedB.includes(ind) && checkedB.length >= count && count<4){
                    others.innerHTML +=
                    `<img src="${element.sprites.front_default}" id="${element.name}">`
                    count ++
                }
             })
                typePokemons.forEach((elem, index) =>{
                    if(!checkedA.includes(index) && count<4){
                        others.innerHTML +=
                            `<img src="${elem.sprites.front_default}" id="${elem.name}">`
                            count ++
                    }
                }) 
            }
                              
}
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');

search.addEventListener('submit', (e)=>{
    
    e.preventDefault()
    pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
    const searched = searchInput.value
    rend(searched)
})
others.addEventListener('click', (e)=>{
    if(e.target.nodeName == "IMG"){
        pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
        rend(e.target.id)
    }
})
     
    


