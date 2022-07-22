let elList = document.querySelector(".list");



function renderPokemons(array) {
    elList.innerHTML = null

    for (let item of array) {
        let newLi = document.createElement("li");
        newLi.classList.add("card");
        let newImg = document.createElement("img");
        newImg.src = item.img;
        newImg.setAttribute("alt" , "pokemon")

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

renderPokemons(pokemons)