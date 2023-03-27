import { checkAndModifyImageValue } from "./data-modify-image-value.js";

export function prepareData(characterObject) {
  // console.log("prepareData: preparing data");
  const checkedObject = checkObject(characterObject);
  const cleanedImage = checkAndModifyImageValue(checkedObject);
  const cleanedKeys = cleanKeys(cleanedImage);
  const preparedObject = cleanValues(cleanedKeys);
  // console.log("prepareData: data prepared");
  return preparedObject;
}

// function to perform initial check upon objects
function checkObject(characterObject) {
  // console.log("checkObject: checking object");
    // if character object is not an not an object or an array, skip to next iteration
    if (typeof characterObject !== "object" || Array.isArray(characterObject)) {
      return;
    }
    // if character object is an empty object, skip to next iteration
    if (Object.keys(characterObject).length === 0) {
      return;
    }
    // if character object is an array of objects, pull out the objects and add them to characterObject
    if (Array.isArray(characterObject) && typeof characterObject[0] === "object") {
      characterObject = characterObject[0];
    }
    // console.log("checkObject: object checked");
    return characterObject;
}


// function to clean object keys
function cleanKeys(characterObject) {
  // console.log("cleanKeys: cleaning keys");
  // define allowed keys
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
      console.log(`cleanKeys: key: ${key} has been changed to ${newKey}`);
      delete characterObject[key];
    }
  }
  // convert mispelled keys to allowed keys
  for (const key in characterObject) {
    const lowercaseKey = key.toLowerCase();
    const matchingKey = allowedKeys.find((allowedKey) => allowedKey.toLowerCase() === lowercaseKey);
    if (matchingKey && key !== matchingKey) {
      characterObject[matchingKey] = characterObject[key];
      console.log(`cleanKeys: key: ${key} has been changed to ${matchingKey}`);
      delete characterObject[key];
    }
  }
  // remove unwanted keys
  for (let key in characterObject) {
    if (!allowedKeys.includes(key)) {
      console.log(`cleanKeys: key: ${key} is not allowed and will be removed`);
      delete characterObject[key];
    }
  }
  // add missing keys with null value
  for (const key of allowedKeys) {
    if (!characterObject.hasOwnProperty(key)) {
      console.log(`cleanKeys: key: ${key} is missing and will be added with null value`);
      characterObject[key] = null;
    }
  }
  // console.log("cleanKeys: keys cleaned");
  return characterObject;
}

// function to clean object values
function cleanValues(characterObject) {
  // console.log("cleanValues: cleaning values");
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
  // console.log("cleanValues: values cleaned");
  return characterObject;
}

