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
function prepareData(arr) {
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

  const result = [];
  // loop through the array of objects
  for (let i = 0; i < arr.length; i++) {
    // get the object
    const characterObject = arr[i];

    // remove unwanted keys
    for (let key in characterObject) {
      if (!allowedKeys.includes(key)) {
        delete characterObject[key];
      }
    }

    // add missing keys with null value
    for (let j = 0; j < allowedKeys.length; j++) {
      const key = allowedKeys[j];
      if (!characterObject.hasOwnProperty(key)) {
        characterObject[key] = null;
      }
    }

    // format string values
    for (let key in characterObject) {
      if (key !== "image" && typeof characterObject[key] === "string") {
        characterObject[key] = characterObject[key].toLowerCase().replace(/\s+/g, " ").trim();
      } else if (key === "image" && typeof characterObject[key] === "string") {
        characterObject[key] = characterObject[key].trim();
      }
    }

    // format number values
    const numericKeys = ["age", "schoolGrade", "appearances"];
    for (let j = 0; j < numericKeys.length; j++) {
      const key = numericKeys[j];
      if (typeof characterObject[key] === "string") {
        const numericPart = characterObject[key].match(/\d+/);
        characterObject[key] = numericPart ? parseInt(numericPart[0]) : null;
      }
    }

    // replace undefined, empty string and string that are === to "undefined" or "null" values with null
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

    result.push(characterObject);
  }

  // remove duplicate objects
  const uniqueObjects = Array.from(new Set(result.map((obj) => JSON.stringify(obj))));
  const uniqueParsedObjects = uniqueObjects.map((obj) => JSON.parse(obj));
  const preparedCharacterData = uniqueParsedObjects;
  return preparedCharacterData;
}

// ====== DATA VALIDATION ======
function validateData(data) {
  console.log("validateData: validating data");
  // check if data is an array and if it has at least one element
  if (!Array.isArray(data) || data.length === 0) {
    console.log("validateData: data is not an array or is empty");
    return false;
  }

  // check if all elements in the array are objects
  for (const element of data) {
    if (typeof element !== "object") {
      console.log("validateData: data is not an array of objects");
      return false;
    }
  }
  // check if all objects have the same keys
  // get the keys of the first object
  const keys = Object.keys(data[0]);
  // loop through the array of objects
  for (let i = 0; i < data.length; i++) {
    const object = data[i];
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
  for (const object of data) {
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
