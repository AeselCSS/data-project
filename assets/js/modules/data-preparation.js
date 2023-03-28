import { cleanImages } from "./data-clean-images.js";
import { cleanKeys } from "./data-clean-keys.js";
import { cleanValues } from "./data-clean-values.js";

export function prepareData(characterObject) {
  // console.log("prepareData: preparing data");
  const checkedObject = checkObject(characterObject);
  const cleanedImage = cleanImages(checkedObject);
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
