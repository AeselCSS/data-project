export function cleanValues(characterObject) {
  convertToLowerCase(characterObject);
  convertToNumber(characterObject);
  convertArrayToString(characterObject);
  removeUnwantedStringParts(characterObject);
  cleanUpGender(characterObject);
  convertToNull(characterObject);
  return characterObject;
}

function convertToLowerCase(characterObject) {
  for (let key in characterObject) {
    if (key !== "image" && typeof characterObject[key] === "string") {
      characterObject[key] = characterObject[key].toLowerCase().replace(/\s+/g, " ").trim();
    } else if (key === "image" && typeof characterObject[key] === "string") {
      characterObject[key] = characterObject[key].trim();
    }
  }
}

function convertToNumber(characterObject) {
  const numericKeys = ["age", "schoolGrade", "appearances"];
  for (let key in characterObject) {
    if (numericKeys.includes(key) && typeof characterObject[key] === "string") {
      const numericPart = characterObject[key].match(/\d+/);
      characterObject[key] = numericPart ? parseInt(numericPart[0]) : null;
    }
  }
}

function convertArrayToString(characterObject) {
  for (let key in characterObject) {
    if (Array.isArray(characterObject[key])) {
      characterObject[key] = characterObject[key].join(", ");
    }
  }
}

// function that checks for unnessesary string parts and removes them in the key firstAppearance
function removeUnwantedStringParts(characterObject) {
  // if characterObject.firstAppearance contains the letter s followed two numbers, followed byt e and two numbers save that in a variable
  const wantedStringPart = characterObject.firstAppearance.match(/s\d{2}e\d{2}/);
  // if wantedStringPart is not null, replace the firstAppearance with the wantedStringPart
  if (wantedStringPart) {
    characterObject.firstAppearance = wantedStringPart[0];
  }
}

// find the first occurance of either "male" or "female" in the gender value and overwrite the value with that
function cleanUpGender(characterObject) {
  if (characterObject.gender.includes("male") && characterObject.gender.includes("female")) {
    const firstFourLetters = characterObject.gender.substring(0, 4);
    if (firstFourLetters === "male") {
      characterObject.gender = "male";
    } else {
      characterObject.gender = "female";
  }
}
return characterObject;
}

function convertToNull(characterObject) {
  const nullValues = [
    undefined,
    "",
    "undefined",
    "null",
    "N/A",
    "n/a",
    "unknown",
    "none",
    "no data",
    "no information",
    "no info",
  ];
  for (let key in characterObject) {
    if (nullValues.includes(characterObject[key])) {
      characterObject[key] = null;
    }
  }
}
