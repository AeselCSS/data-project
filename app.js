"use strict";

// import modules
import { prepareData } from "./assets/js/modules/data-preparation.js";
import { validateData } from "./assets/js/modules/data-validation.js";
import { createCharacterCards } from "./assets/js/modules/dom-character-cards.js";

window.addEventListener("load", initApp);

// init app
async function initApp() {
  console.log("initApp: app started");

  // get data from url
  const url = "https://cederdorff.github.io/dat-js/05-data/southpark.json";
  const characterData = await getJsonData(url);
  console.log("initApp: data fetched");

  // prepare data
  const preparedDataArray = prepareDataArray(characterData);

  // remove duplicate objects from array
  const uniqueObjectsArray = removeDuplicateObjects(preparedDataArray);
  console.log("initApp: duplicate objects removed");

  // validate the array of character objects
  const isDataValid = validateData(uniqueObjectsArray);

  // if data is valid, create character cards
  if (isDataValid) {
    for (const character of uniqueObjectsArray) {
      createCharacterCards(character);
    }
    console.log("initApp: character cards created");
  }
}

function prepareDataArray(characterData) {
  const preparedDataArray = [];
  // loop through data
  characterData.forEach(function (character) {
    // prepare each character object
    const preparedData = prepareData(character);
    console.log("initApp: data prepared, pushing to array");
    preparedDataArray.push(preparedData);

    return preparedData;
  });
  return preparedDataArray;
}

async function getJsonData(url) {
  // console.log("getJsonData: fetching data from url");
  const response = await fetch(url);
  return await response.json();
}

function removeDuplicateObjects(array) {
  const uniqueObjects = Array.from(new Set(array.map((object) => JSON.stringify(object))));
  return uniqueObjects.map((object) => JSON.parse(object));
}