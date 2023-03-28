import { showDetails } from "./dom-detailed-view.js";
import * as domHelpers from "./dom-helpers.js";

export function createCharacterCards(character) {
  // console.log(`createCharacterCards: creating character card for: ${character.name}`);

  // create the html card
  const characterCard = /*html*/ `
            <article class="grid-item item-card">
                <h2>${domHelpers.capitalizeAll(character.name)}</h2>
                <img src="${character.image}" alt="image of ${character.name}">
                <p>${character.age} Years Old</p>
                <p>${domHelpers.capitalizeAll(character.occupation)}</p>
            </article>
        `;
  // insert the html card into the grid container
  document.querySelector(".grid-container").insertAdjacentHTML("beforeend", characterCard);
  // attach event listener to each of the cards
  document.querySelector("article:last-child").addEventListener("click", function () {
    showDetails(character);
  });
}
