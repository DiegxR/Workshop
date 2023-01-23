import { rendPokemon } from "./renderPokemon.js";
import { rendOthers } from "./renderOther.js";
const pokemonInfo = document.getElementById('pokemon-info-container')
const others = document.getElementById('others');                 
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const more = document.getElementById('more');
let next = 0;

search.addEventListener('submit', (e)=>{
    e.preventDefault()
    next = 0;
    more.style.display = 'block'
    
    
    pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
    const searched = searchInput.value
    rendPokemon(searched)
    rendOthers(searched)  
    return false;
})

others.addEventListener('click', (e)=>{
    if(e.target.nodeName == "IMG"){
        pokemonInfo.innerHTML = `
    <img src="./img/loadPokeball.png" id='pokeball'>
    `
   
        rendPokemon(e.target.id)
        rendOthers(e.target.id)  
    }
})
others.addEventListener('mouseover', (e)=>{
    if(e.target.nodeName == "IMG"){
        console.log([e.target.id, e.target.classList.value])
    }
})
more.style.display = 'none'
console.log(others.innerHTML)

more.addEventListener('click', e =>{
    more.style.backgroundColor = 'white'
    if(next == 0){
        next = 4
    }
    const type = e.composedPath()[2].children[1].children[3].classList.value   
    if(searchInput.value !== ""){
        rendOthers(searchInput.value, next)
        next += 4;
    } else{
        rendOthers(type, next)
        next += 4;
    }
})
     
    


