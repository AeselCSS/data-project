import { showDetails } from "./dom-detailed-view-module.js";

export function createCharacterCards(characterData) {
  console.log("createCharacterCards: creating character cards from below array of objects");
  console.log(characterData);
  // loop through the data object
  for (const character of characterData) {
    // create the html card
    const characterCard = /*html*/ `
            <article class="grid-item item-card">
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <p>"${character.catchPhrase}"</p>
                <p>${character.age} years old</p>
                <p>${character.occupation}</p>
            </article>
        `;
    // insert the html card into the grid container
    document.querySelector(".grid-container").insertAdjacentHTML("beforeend", characterCard);
  }
  // attach event listeners to each card
  document.querySelectorAll(".item-card").forEach((card) => {
    card.addEventListener("click", function () {
        showDetails(characterData);
    });
  });
}
