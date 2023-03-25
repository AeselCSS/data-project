"use strict";

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

  const preparedCharacterData = removeDuplicateObjects(result);
  return preparedCharacterData;
}

// Function to remove duplicate objects from an array
function removeDuplicateObjects(array) {
  const uniqueObjects = Array.from(new Set(array.map((object) => JSON.stringify(object))));
  return uniqueObjects.map((object) => JSON.parse(object));
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

  // check if the value is an array and if it is convert it to a string
  // and add a comma between each element from the array
  for (let key in characterObject) {
    if (Array.isArray(characterObject[key])) {
      characterObject[key] = characterObject[key].join(", ");
    }
  }

  // convert undefined, empty string  and different variations of "no data" to null
  for (let key in characterObject) {
    if (
      characterObject[key] === undefined ||
      characterObject[key] === "" ||
      characterObject[key] === "undefined" ||
      characterObject[key] === "null" ||
      characterObject[key] === "N/A" ||
      characterObject[key] === "n/a" ||
      characterObject[key] === "unknown" ||
      characterObject[key] === "none" ||
      characterObject[key] === "no data" ||
      characterObject[key] === "no information" ||
      characterObject[key] === "no info"
    ) {
      characterObject[key] = null;
    }
  }
}

// ====== DATA VALIDATION ======
function validateData(dataArray) {
  console.log("validateData: validating data");

  if (!isArrayNotEmpty(dataArray)) {
    console.log("validateData: data is not an array or is empty");
    return false;
  }

  if (!isArrayOfObjects(dataArray)) {
    console.log("validateData: data is not an array of objects");
    return false;
  }

  if (!hasSameKeys(dataArray)) {
    console.log("validateData: object has different number of keys or different keys");
    return false;
  }

  if (!hasValidFields(dataArray)) {
    console.log("validateData: object has invalid value");
    return false;
  }

  console.log("validateData: validation passed");
  return true;
}

// check if data passed to the function is an array and if it has at least one element
function isArrayNotEmpty(dataArray) {
  if (Array.isArray(dataArray) && dataArray.length > 0) {
    return true;
  }
  return false;
}
// check if all elements in the array are objects
function isArrayOfObjects(dataArray) {
  for (const characterObject of dataArray) {
    if (typeof characterObject !== "object") {
      return false;
    }
  }
  return true;
}
// check if all objects have the same keys
function hasSameKeys(dataArray) {
  // get the keys of the first object
  const keys = Object.keys(dataArray[0]);
  for (const characterObject of dataArray) {
    // check if the object has the same number of keys as the first object
    if (Object.keys(characterObject).length !== keys.length) {
      return false;
    }
    for (const key of keys) {
      // check if the object has the same keys as the first object
      if (!characterObject.hasOwnProperty(key)) {
        return false;
      }
    }
  }
  return true;
}

// check if all fields have either a string, a number or null value
function hasValidFields(dataArray) {
  for (const characterObject of dataArray) {
    // loop through the keys of the object
    for (const key in characterObject) {
      // get the value of the key
      const value = characterObject[key];
      // check if the value is a string, a number or null
      if (typeof value !== "string" && typeof value !== "number" && value !== null) {
        return false;
      }
    }
  }
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
