"use strict";

// inport functions
import { prepareData } from "./data-preparation-module.js";
import { validateData } from "./data-validation-module.js";
import { getJsonData } from "./data-getJsonData-module.js";
import { createCharacterCards } from "./dom-character-cards-module.js";

window.addEventListener("load", initApp);

// init app
async function initApp() {
  console.log("initApp: app started");

  // get data from json file
  const characterData = await getJsonData("./assets/data/test.json");
  console.log("initApp: data fetched");
  // prepare data
  const preparedData = prepareData(characterData);
  console.log("initApp: data prepared");
  // validate data
  if (!validateData(preparedData)) {
    console.error("initApp: data is not valid");
    return;
  }
  console.log("initApp: data is valid");

  // create html cards
  createCharacterCards(preparedData);
  console.log("initApp: character cards created");
}
