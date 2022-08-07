let elList = document.querySelector(".list");
let elTemplate = document.querySelector(".template")
let elSelect = document.querySelector(".select__types");
let elForm = document.querySelector(".form ");
let elTotal = document.querySelector(".total");
let inputName = document.querySelector(".search__name")
let inputWeight = document.querySelector(".search__weight")
let inputHeight = document.querySelector(".search__height")
let elSort = document.querySelector(".select__sort")
let pokemonslice = pokemons.slice(0, 12)
let normolizedArray = pokemonslice.map(item => {
    return {
        name: item.name.toString(),
        type: item.type,
        height: item.height,
        weight: item.weight,
        img: item.img
    }
});



function getTypes(array) {

    let getTypes = [];
    for (const item of array) {
        for (const itemCategory of item.type) {
            if (!getTypes.includes(itemCategory)) {
                getTypes.push(itemCategory)
            }
        }
    }

    return getTypes
}

pokemonTypes = getTypes(normolizedArray);

function renderTypes(array, wrapper) {
    let tempFragment = document.createDocumentFragment();

    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item;

        tempFragment.appendChild(newOption);
    }

    wrapper.appendChild(tempFragment)
}

renderTypes(pokemonTypes, elSelect)


function renderPokemons(array) {
    elList.innerHTML = null

    for (let item of array) {
        let newLi = document.createElement("li");
        newLi.classList.add("card");
        let newImg = document.createElement("img");
        newImg.src = item.img;
        newImg.setAttribute("alt", "pokemon")

        let newH3 = document.createElement("h3");
        newH3.textContent = item.name;

        let newh5 = document.createElement("h5")
        newh5.innerHTML = `Type: ${item.type} <br>
        Height: ${item.height} <br> Weight: ${item.weight}`;


        newLi.appendChild(newImg);
        newLi.appendChild(newH3);
        newLi.appendChild(newh5);

        elList.appendChild(newLi)

    }
}

function renderPokemons(array, wrapper) {
    wrapper.innerHTML = null;
    let totalPokemons = 0;
    let tempFragment = document.createDocumentFragment();
    for (const item of array) {

        let newLi = document.createElement("li");
        newLi.classList.add("card");
        let newImg = document.createElement("img");
        newImg.src = item.img;
        newImg.setAttribute("alt", "pokemon")

        let newH3 = document.createElement("h3");
        newH3.textContent = item.name;

        let newH5 = document.createElement("h5")
        newH5.innerHTML = `Type: ${item.type} <br>
        Height: ${item.height} <br> Weight: ${item.weight}`;



        newLi.appendChild(newImg)
        newLi.appendChild(newH3)
        newLi.appendChild(newH5)
        tempFragment.appendChild(newLi)
        totalPokemons++;
    }

    elTotal.textContent = totalPokemons;
    if (totalPokemons != 0) {
        wrapper.appendChild(tempFragment)

    } else {
        wrapper.innerHTML = "<h1>0 Movies found</h1>"
    }


}

renderPokemons(normolizedArray, elList)



elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();


    let elName = inputName.value.trim();
    let elWeight = inputWeight.value.trim();
    let elHeight = inputHeight.value.trim();
    let Selected = elSelect.value;
    let filteredArray = pokemons.filter(function (item) {
        let sort = Selected == "all" ? true : item.type.includes(Selected)
        let validation = sort && item.weight >= elWeight && item.height >= elHeight && item.name.search(elName) != -1
        return validation
    })
    filteredArray.sort((a, b) => {
        if (elSort == "heavy-first") {
            return b.weight.split(" ")[0] - a.weight.split(" ")[0]
        }
        if (elSort == "light-first") {
            return a.weight.split(" ")[0] - b.weight.split(" ")[0]
        }
        if (elSort == "Tallest-first") {
            return b.height.split(" ")[0] - a.height.split(" ")[0]
        }
        if (elSort == "Shortest-first") {
            return a.height.split(" ")[0] - b.height.split(" ")[0]
        }
        if (elSort == "az") {
            return a === b ? 0 : (a.name < b.name) ? -1 : 1;
        }

        if (elSort == "za") {
            return a === b ? 0 : (b.name < a.name) ? -1 : 1;
        }
    })
    renderPokemons(filteredArray, elList);

})