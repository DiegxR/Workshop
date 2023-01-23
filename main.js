import { getPokemons } from "./helpers/getPokemons.js"
const pokemonInfo = document.getElementById('pokemon-info-container')
const others = document.getElementById('others');

const renderType = (data, type) =>{
    return data.filter((elem)=> elem.types[0].type.name.includes(type))
} 

const renderData = async(name="") =>{
    const promises = await getPokemons()
    const allData = await Promise.all(promises)
    let filterPokemons = allData.filter(data => data.name.includes(name.toLowerCase()))
    return {
        filterPokemons,
        allData
    }
}
const rendArrays = async(name) =>{
    const renderDat = await renderData(name);
    const {filterPokemons, allData} = renderDat;
    let data = filterPokemons[0];
    let types = []
    let typePokemons;
    allData.forEach(elem=>{
        if(!types.includes(elem.types[0].type.name)){
            types.push(elem.types[0].type.name)
        }
     })
     if(types.includes(name)){
        typePokemons = allData.filter(element => element.types[0].type.name == name.toLowerCase())
        data = typePokemons[0]
     }else{
         if(filterPokemons.length !== 0 ){
            typePokemons = renderType(allData, data.types[0].type.name)
        }else{
            pokemonInfo.innerHTML += `<p style ="font-weight:800; font-size:35px; color:red; ">NOT FOUND</p>`
        }
     }
     return {
        typePokemons,
        data,
        types
     }
}
const rendPokemon = async (name) =>{
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
  
const rendOthers = async(name, more="") =>{
const rendData  = await renderData(name)
const {filterPokemons} = rendData
const arrays  = await rendArrays(name)
const {typePokemons, data, types} = arrays

                let count = 0
                let checkedA = []
                let checkedB = []
                
                others.innerHTML = ""
                console.log(more)
            if(types.includes(name)){
                typePokemons.forEach((elem, index) =>{
                    if((elem.id !== data.id) && count<4){
                        if(more !== ""){
                            if(index>more){
                                others.innerHTML +=
                                    `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                                    count ++
                            }
                        }else{
                            others.innerHTML +=
                                    `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                                    count ++
                        }
                        
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
                        `<img src="${element.sprites.front_default}" id="${element.name}" class="${data.types[0].type.name}">`
                        count ++
                    }
                 })
                    typePokemons.forEach((elem, index) =>{
                        if(!checkedA.includes(index) && count<4){
                            others.innerHTML +=
                                `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                                count ++
                        }
                    }) 
                }
}
                                                       
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const more = document.getElementById('more');
let next = 0;
search.addEventListener('submit', (e)=>{
    next = 0;
    more.style.display = 'block'
    console.log('subm')
    e.preventDefault()
    pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
    const searched = searchInput.value
    rendPokemon(searched)
    rendOthers(searched)  
})
others.addEventListener('click', (e)=>{
    if(e.target.nodeName == "IMG"){
        pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
    
    rendPokemon(e.target.id)
    rendOthers(e.target.id)  
    console.log(e.target.id)
    }
   
})

more.style.display = 'none'
console.log(others.innerHTML)

more.addEventListener('click', e =>{
    more.style.backgroundColor = 'skyblue'
    if(next == 0){
        next = 4
    }
    const type = e.composedPath()[2].children[1].children[3].classList.value   
    rendOthers(type, next)
    setTimeout(()=>{
        more.style.backgroundColor = 'black'
    },1500)
    next += 4;
})
     
    


