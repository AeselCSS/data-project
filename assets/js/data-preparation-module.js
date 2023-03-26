export function prepareData(dataArray) {
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
