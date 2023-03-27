import { showModal } from "./dom-modal.js";

export function showDetails(character) {
  console.log(`showDetails: showing details for: ${character.name}`);
  // populate the modal-content with the data from the object
  document.querySelector("#character-name").textContent = character.name;
  document.querySelector("#character-nickname").textContent = character.nickname;
  document.querySelector("#character-image").src = character.image;
  document.querySelector("#character-image").alt = character.name;
  document.querySelector("#character-occupation").textContent = character.occupation;
  document.querySelector("#character-age").textContent = character.age;
  document.querySelector("#character-voicedby").textContent = character.voicedBy;
  document.querySelector("#character-gender").textContent = character.gender;
  document.querySelector("#character-religion").textContent = character.religion;
  document.querySelector("#character-catchphrase").textContent = character.catchPhrase;
  document.querySelector("#character-haircolor").textContent = character.hairColor;
  document.querySelector("#character-schoolgrade").textContent = character.schoolGrade;
  document.querySelector("#character-episodes").textContent = character.episodes;
  document.querySelector("#character-appearances").textContent = character.appearances;
  document.querySelector("#character-firstappearance").textContent = character.firstAppearance;

  // open the modal
  showModal(); // from dom-modal-module.js
}
// TODO: add helper functions to present data in more readable formats
//       - e.g. capitalize first letter of each word
//       - e.g. handle null values in different scenarios
//       - e.g. show appearances as a list of episodes grouped by season
// TODO: Adjust css to make the modal more readable and presentable
