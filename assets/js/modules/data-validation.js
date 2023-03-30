export function validateData(dataArray) {
  // console.log("validateData: validating data");

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

  if (!hasValidValues(dataArray)) {
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
function hasValidValues(dataArray) {
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