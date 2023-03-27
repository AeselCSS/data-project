"use strict";

// import modules
import { getJsonData } from "./assets/js/modules/data-getJsonData.js";
import { prepareData } from "./assets/js/modules/data-preparation.js";
import { validateData } from "./assets/js/modules/data-validation.js";
import { removeDuplicateObjects } from "./assets/js/modules/data-remove-duplicates.js";
import { createCharacterCards } from "./assets/js/modules/dom-character-cards.js";

window.addEventListener("load", initApp);

// init app
async function initApp() {
  console.log("initApp: app started");

  // get data from url
  const url = "https://cederdorff.github.io/dat-js/05-data/southpark.json";
  const testUrl = "./assets/data/test.json";
  const characterData = await getJsonData(url);
  console.log("initApp: data fetched");

  const preparedDataArray = [];
  // loop through data
  characterData.forEach(function (character) {
    // prepare each character object
    const preparedData = prepareData(character);
    console.log("initApp: data prepared, pushing to array");
    preparedDataArray.push(preparedData);

    return preparedData;
  });

  // remove duplicate objects from array
  const uniqueObjectsArray = removeDuplicateObjects(preparedDataArray);
  console.log("initApp: duplicate objects removed");

  // validate the array of character objects
  const isDataValid = validateData(uniqueObjectsArray);
  if (isDataValid) {
    console.log("initApp: data validated");
  } else {
    console.log("initApp: ERROR: data is invalid");
  }

  // if data is valid, create character cards
  if (isDataValid) {
    uniqueObjectsArray.forEach(createCharacterCards);
    console.log("initApp: character cards created");
  }
}
