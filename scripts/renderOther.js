import { rendArrays } from "./filterTypeData.js";
import { renderData } from "./filterNameData.js";
const others = document.getElementById('others');
const morebtn = document.getElementById('more');
export const rendOthers = async (name, more = "") => {
    
    const rendData = await renderData(name)
    const { filterPokemons } = rendData
    const arrays = await rendArrays(name)
    const { typePokemons, data, types } = arrays
    let count = 0
    let checkedA = []
    let checkedB = []
    others.innerHTML = ""
    if (types.includes(name)) {
        typePokemons.forEach((elem, index) => {
            if ((elem.id !== data.id) && count < 4) {
                if (more !== "") {
                    if (index > more) {
                        others.innerHTML +=
                            `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                        count++
                    }
                } else {
                    others.innerHTML +=
                        `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                    count++
                }

            }
        })
        morebtn.style.backgroundColor = 'black'
    } else {
        typePokemons.forEach((elem, index) => {
            filterPokemons.forEach((element, ind) => {
                if (elem.name == element.name) {
                    checkedA.push(index)
                }
                if (element.id !== data.id) {
                    checkedB.push(ind)
                }
            })
        })
        filterPokemons.forEach((element, ind) => {
            if (checkedB.includes(ind) && count < 4) {
                if (element.id !== data.id) {
                    if (more !== "") {
                        if (ind > more) {
                            others.innerHTML +=
                                `<img src="${element.sprites.front_default}" id="${element.name}" class="${data.types[0].type.name}">`
                            count++
                        }
                    } else {
                        others.innerHTML +=
                            `<img src="${element.sprites.front_default}" id="${element.name}" class="${data.types[0].type.name}">`
                        count++
                    }
                }
            }
        })
        typePokemons.forEach((elem, index) => {
            if (!checkedA.includes(index) && count < 4) {
                if (more !== "") {
                    if (index > more) {
                        others.innerHTML +=
                            `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                        count++
                    }
                } else {
                    others.innerHTML +=
                        `<img src="${elem.sprites.front_default}" id="${elem.name}" class="${data.types[0].type.name}">`
                    count++
                }
            }
        })
        
        morebtn.style.backgroundColor = 'black'
    }
}