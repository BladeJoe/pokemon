let elList = document.querySelector(".list");
let elTemplate = document.querySelector(".template")
let elSelect = document.querySelector(".select__types");
let elForm = document.querySelector(".form ");
let elTotal = document.querySelector(".total");
let inputName = document.querySelector(".search__name")
let inputWeight = document.querySelector(".search__weight")
let inputHeight = document.querySelector(".search__height")
let elSort = document.querySelector(".select__sort")


let normolizedArray = pokemons.map(item => {
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
        Height: ${item.height} m <br> Weight: ${item.weight} kg`;



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
        wrapper.innerHTML = "<h1>0 Pokemons found</h1>"
    }


}

renderPokemons(normolizedArray, elList)


elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();


    let filteredArray = normolizedArray.filter(function (item) {

        let name = item.name.toUpperCase();
        let isertName = inputName.value.toUpperCase();

        let types = elSelect.value == "all" ? true : item.type.includes(elSelect.value);

        let validation = types && item.weight >= Number(inputWeight.value) && item.height >= Number(inputHeight.value) &&
            (name.startsWith(isertName.toUpperCase()));

        return validation

    })




    filteredArray.sort((a, b) => {

        if (elSort.value == "heavy-first") {
            return b.weight - a.weight
        }
        if (elSort.value == "light-first") {
            return a.weight - b.weight
        }
        if (elSort.value == "tallest-first") {
            return b.height - a.height
        }
        if (elSort.value == "shortest-first") {
            return a.height - b.height
        }
    })

    renderPokemons(filteredArray, elList);

})