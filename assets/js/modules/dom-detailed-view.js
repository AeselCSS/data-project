import { showModal } from "./dom-modal.js";
import * as domHelpers from "./dom-helpers.js";

export function showDetails(character) {
  console.log(`showDetails: showing details for: ${character.name}`);
  // populate the modal-content with the data from the object
  document.querySelector(".character-name").textContent = domHelpers.capitalizeAll(character.name);
  document.querySelector("#character-nickname").textContent = domHelpers.generalFormatting(
    "nickname",
    domHelpers.capitalizeAll(character.nickname),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-image").src = character.image;
  document.querySelector("#character-image").alt = domHelpers.capitalizeAll(character.name);
  document.querySelector("#character-occupation").textContent = domHelpers.formatOccupation(
    domHelpers.capitalizeAll(character.occupation),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-age").textContent = domHelpers.formatAge(character.age, character.gender, domHelpers.capitalizeAll(character.name));
  document.querySelector("#character-voicedby").textContent = domHelpers.formatVoicedBy(
    domHelpers.capitalizeAll(character.voicedBy),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-gender").textContent = domHelpers.formatGender(character.gender);
  document.querySelector("#character-religion").textContent = domHelpers.generalFormatting(
    "religion",
    domHelpers.capitalizeAll(character.religion),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-catchphrase").textContent = domHelpers.generalFormatting(
    "catchphrase",
    domHelpers.capitalizeAll(character.catchPhrase),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-haircolor").textContent = domHelpers.generalFormatting(
    "hair color",
    domHelpers.capitalizeAll(character.hairColor),
    character.gender,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-schoolgrade").textContent = domHelpers.formatSchoolGrade(character.schoolGrade);
  document.querySelector("#character-appearances").textContent = domHelpers.formatAppearances(
    character.appearances,
    domHelpers.capitalizeAll(character.name)
  );
  document.querySelector("#character-firstappearance").textContent = domHelpers.formatFirstAppearance(
    character.firstAppearance,
    domHelpers.capitalizeAll(character.name)
  );
  domHelpers.formatEpisodes(character.episodes);
  // open the modal
  showModal(); // from dom-modal-module.js
}

// TODO: Adjust css to make the modal more readable and presentable
