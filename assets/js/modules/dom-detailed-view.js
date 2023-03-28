import { showModal } from "./dom-modal.js";
import * as domHelpers from "./dom-helpers.js";

export function showDetails(character) {
  console.log(`showDetails: showing details for: ${character.name}`);
  // populate the modal-content with the data from the object
  document.querySelector(".character-name").textContent = domHelpers.capitalizeAll(character.name);
  document.querySelector("#character-nickname").textContent = domHelpers.capitalizeAll(character.nickname);
  document.querySelector("#character-image").src = character.image;
  document.querySelector("#character-image").alt = domHelpers.capitalizeAll(character.name);
  document.querySelector("#character-occupation").textContent = domHelpers.capitalizeAll(character.occupation);
  document.querySelector("#character-age").textContent = character.age;
  document.querySelector("#character-voicedby").textContent = domHelpers.capitalizeAll(character.voicedBy);
  document.querySelector("#character-gender").textContent = domHelpers.capitalizeAll(character.gender);
  document.querySelector("#character-religion").textContent = character.religion;
  document.querySelector("#character-catchphrase").textContent = domHelpers.capitalizeAll(character.catchPhrase);
  document.querySelector("#character-haircolor").textContent = domHelpers.capitalizeAll(character.hairColor);
  document.querySelector("#character-schoolgrade").textContent = domHelpers.formatSchoolGrade(character.schoolGrade);
  document.querySelector("#character-appearances").textContent = character.appearances;
  document.querySelector("#character-firstappearance").textContent = character.firstAppearance;
  domHelpers.formatEpisodes(character.episodes);
  // open the modal
  showModal(); // from dom-modal-module.js
}

// TODO: Adjust css to make the modal more readable and presentable
