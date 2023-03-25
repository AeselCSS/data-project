"use strict";

window.addEventListener("load", initApp);

// init app
async function initApp() {
  console.log("initApp: app started");

  // get data from json file
  const characterData = await getJsonData("./assets/data/data.json");
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

// ====== DATA FUNCTIONS ======

// ====== FETCH DATA ======
async function getJsonData(url) {
  console.log("getJsonData: fetching data from url");
  const response = await fetch(url);
  return await response.json();
}

// ====== PREPARE DATA FUNCTIONS ======
// main function to prepare data
function prepareData(dataArray) {
  console.log("prepareData: preparing data");
  const result = [];

  for (let i = 0; i < dataArray.length; i++) {
    const characterObject = dataArray[i];

    cleanKeys(characterObject);
    cleanValues(characterObject);

    result.push(characterObject);
  }
  // remove duplicate objects from the result array
  const uniqueObjects = Array.from(new Set(result.map((characterObject) => JSON.stringify(characterObject))));
  const preparedCharacterData = uniqueObjects.map((characterObject) => JSON.parse(characterObject));
  return preparedCharacterData;
}

// function to clean object keys
function cleanKeys(characterObject) {
  console.log("cleanKeys: cleaning keys");
  const allowedKeys = [
    "name",
    "nickname",
    "image",
    "occupation",
    "age",
    "voicedBy",
    "gender",
    "religion",
    "catchPhrase",
    "hairColor",
    "schoolGrade",
    "episodes",
    "appearances",
    "firstAppearance",
  ];

  // check if all keys are allowed keys if not move to subsequent loops to clean keys
  for (const key in characterObject) {
    if (!allowedKeys.includes(key)) {
      console.log(`cleanKeys: key: ${key} is not allowed`);
      break;
    }
  } 

  // remove spaces, underscores and numbers from keys
  for (const key in characterObject) {
    if (/\s|_|[0-9]/.test(key)) {
      const newKey = key.replace(/\s|_|[0-9]/g, "");
      characterObject[newKey] = characterObject[key];
      delete characterObject[key];
    }
  }
  // convert mispelled keys to allowed keys
  for (const key in characterObject) {
    const lowercaseKey = key.toLowerCase();
    const matchingKey = allowedKeys.find((allowedKey) => allowedKey.toLowerCase() === lowercaseKey);
    if (matchingKey && key !== matchingKey) {
      characterObject[matchingKey] = characterObject[key];
      delete characterObject[key];
    }
  }
  // remove unwanted keys
  for (let key in characterObject) {
    if (!allowedKeys.includes(key)) {
      delete characterObject[key];
    }
  }
  // add missing keys with null value
  for (const key of allowedKeys) {
    if (!characterObject.hasOwnProperty(key)) {
      characterObject[key] = null;
    }
  }
}

// function to clean object values
function cleanValues(characterObject) {
  console.log("cleanValues: cleaning values");
  // convert all values besides the value of the key "image" to lowercase, trim and remove extra spaces
  for (let key in characterObject) {
    if (key !== "image" && typeof characterObject[key] === "string") {
      characterObject[key] = characterObject[key].toLowerCase().replace(/\s+/g, " ").trim();
    } else if (key === "image" && typeof characterObject[key] === "string") {
      characterObject[key] = characterObject[key].trim();
    }
  }
  // convert string values to numbers for the keys "age", "schoolGrade" and "appearances"
  const numericKeys = ["age", "schoolGrade", "appearances"];
  for (let key in characterObject) {
    // check if the key is a numeric key and if the value is a string that contains a number
    // (e.g. "age": "12 years old") and convert it to a number
    if (numericKeys.includes(key) && typeof characterObject[key] === "string") {
      const numericPart = characterObject[key].match(/\d+/);
      
      characterObject[key] = numericPart ? parseInt(numericPart[0]) : null;
    }
  }

  for (let key in characterObject) {
    if (
      characterObject[key] === undefined ||
      characterObject[key] === "" ||
      characterObject[key] === "undefined" ||
      characterObject[key] === "null"
    ) {
      characterObject[key] = null;
    }
  }
}

// ====== DATA VALIDATION ======
function validateData(dataArray) {
  console.log("validateData: validating data");
  // check if data is an array and if it has at least one element
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.log("validateData: data is not an array or is empty");
    return false;
  }

  // check if all elements in the array are objects
  for (const element of dataArray) {
    if (typeof element !== "object") {
      console.log("validateData: data is not an array of objects");
      return false;
    }
  }
  // check if all objects have the same keys
  // get the keys of the first object
  const keys = Object.keys(dataArray[0]);
  // loop through the array of objects
  for (let i = 0; i < dataArray.length; i++) {
    const object = dataArray[i];
    // check if the object has the same number of keys as the first object
    if (Object.keys(object).length !== keys.length) {
      console.log("validateData: object has different number of keys");
      return false;
    }
    // check if the object has the same keys as the first object
    for (const key of keys) {
      if (!object.hasOwnProperty(key)) {
        console.log("validateData: object has different keys");
        return false;
      }
    }
  }
  // check if all fields have either a string, a number, an array, null or undefined value

  // NOTE: this step of the valisation should ideally be limited to strings and numbers,
  // and fail if the value is an array, null or undefined.
  // perhaps data should be prepared before validation.
  // either way this step should be revised at a later point.

  // loop through the array of objects
  for (const object of dataArray) {
    // loop through the keys of the object
    for (const key in object) {
      // get the value of the key
      const value = object[key];
      // check if the value is a string, a number, an array, null or undefined
      if (
        typeof value !== "string" &&
        typeof value !== "number" &&
        !Array.isArray(value) &&
        value !== null &&
        typeof value !== "undefined"
      ) {
        console.log("validateData: object has invalid value");
        // return false if the value is not a string, a number, an array, null or undefined
        return false;
      }
    }
  }
  // return true if all checks pass
  console.log("validateData: validation passed");
  return true;
}

// ====== DOM MANIPULATION FUNCTIONS ======

// create character cards from array of objects
function createCharacterCards(characterData) {
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
      showModal();
    });
  });
}

// ====== DIALOG MODAL FUNCTIONS ======
// open modal
function showModal() {
  const modal = document.querySelector("#modal-container");
  const modalBackground = document.querySelector(".modal-background");
  const closeButton = document.querySelector("#close-dialog");
  modal.classList.remove("close");
  modal.classList.add("open");
  modal.show();
  // modal.removeEventListener("load", showModal);
  closeButton.addEventListener("click", closeModal);
  // close modal when clicking everything else than .modal-content and its children
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      closeModal();
    }
  });
  // close modal when pressing the escape key
  modal.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// close modal
function closeModal() {
  const modal = document.querySelector("#modal-container");
  modal.classList.remove("open");
  modal.classList.add("close");
  modal.close();
}
