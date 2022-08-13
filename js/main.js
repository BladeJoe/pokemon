let elList = document.querySelector(".list");
let elTemplate = document.querySelector(".template")
let elSelect = document.querySelector(".select__types");
let elForm = document.querySelector(".form ");
let elTotal = document.querySelector(".total");
let inputName = document.querySelector(".search__name")
let inputWeight = document.querySelector(".search__weight")
let inputHeight = document.querySelector(".search__height")
let elSort = document.querySelector(".select__sort")
let elLikedList = document.querySelector(".like__list");
let likedItem = document.querySelector("#liked_item").content;

function changeImage() {

    let likedPokemon = document.getElementById("like")
    console.log(likedPokemon);
    if (likedPokemon.src == "./../like.png") {
        likedPokemon.src = "";
    } else {
        likedPokemon.src = "./../like.png";
    }
}
let localPokemons = JSON.parse(localStorage.getItem("likedPokemons"))
if (localPokemons) {
    likedPokemons = localPokemons
} else {
    likedPokemons = []
}




let normolizedArray = pokemons.map(item => {
    return {
        name: item.name.toString(),
        type: item.type,
        height: item.height,
        weight: item.weight,
        img: item.img,
        id: item.id
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

renderBookmarks(likedPokemons);

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
        newImg.setAttribute("class", "img")

        let newH3 = document.createElement("h3");
        newH3.textContent = item.name;

        let newH5 = document.createElement("h5")
        newH5.innerHTML = `Type: ${item.type} <br>
        Height: ${item.height} m <br> Weight: ${item.weight} kg`;


        let newLike = document.createElement("img")
        newLike.id = "like";
        if (likedPokemons.includes(item)) {
            newLike.id = "liked"
        }
        newLike.style.width = "20%";
        newLike.style.height = "20%";
        newLike.dataset.likeId = item.id;

        newLi.appendChild(newImg)
        newLi.appendChild(newH3)
        newLi.appendChild(newH5)
        newLi.appendChild(newLike)
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

elForm.addEventListener("input", function (evt) {
    evt.preventDefault();


    let filteredArray = normolizedArray.filter(function (item) {

        let insertedName = inputName.value.toUpperCase();
        let pattern = new RegExp(insertedName, 'gi');
        let types = elSelect.value == "all" ? true : item.type.includes(elSelect.value);

        let validation = types && item.weight >= Number(inputWeight.value) && item.height >= Number(inputHeight.value) && Boolean(item.name.match(pattern))

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
        if (elSort.value == "a-z") {
            let firstValue = a.name.toLowerCase();
            let secondValue = b.name.toLowerCase();

            if (firstValue > secondValue) {
                return 1
            } else if (firstValue < secondValue) {
                return -1
            } else {
                return 0
            }
        }

        if (elSort.value == "z-a") {
            let firstValue = a.name.toLowerCase();
            let secondValue = b.name.toLowerCase();

            if (firstValue > secondValue) {
                return -1
            } else if (firstValue < secondValue) {
                return 1
            } else {
                return 0
            }
        }
    })

    renderPokemons(filteredArray, elList);

})

function renderBookmarks(arrayOfPokemons) {
    elLikedList.innerHTML = null

    let fragment = document.createDocumentFragment();

    for (const item of arrayOfPokemons) {
        let likedId = likedItem.cloneNode(true);

        likedId.querySelector(".bookmark__title").textContent = item.name;
        likedId.querySelector(".bookmark__btn").dataset.likeId = item.id;

        fragment.appendChild(likedId);
    }

    elLikedList.appendChild(fragment)
    renderPokemons(normolizedArray, elList)

}


elLikedList.addEventListener("click", function (evt) {
    let likeId = evt.target.dataset.likeId
    if (likeId) {
        let FoundLikedPokemons = likedPokemons.findIndex(function (item) {
            return item.id == likeId
        })

        likedPokemons.splice(FoundLikedPokemons, 1);

        localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
    }
    renderBookmarks(likedPokemons);
})

elList.addEventListener("click", function (evt) {
    let currentlikeId = evt.target.dataset.likeId;

    if (currentlikeId) {
        let foundPokemon = normolizedArray.find(function (item) {
            return item.id == currentlikeId
        })

        if (likedPokemons.length == 0) {
            likedPokemons.unshift(foundPokemon)
            localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
        } else {
            let isMovieInArray = likedPokemons.find(function (item) {
                return item.id == foundPokemon.id
            })

            if (!isMovieInArray) {
                likedPokemons.unshift(foundPokemon)
                localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
            }
        }
        renderBookmarks(likedPokemons)
    }
})