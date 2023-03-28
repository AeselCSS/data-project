export function cleanValues(characterObject) {
  convertToLowerCase(characterObject);
  convertToNumber(characterObject);
  convertArrayToString(characterObject);
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
