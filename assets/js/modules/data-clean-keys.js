// Define allowed keys
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

// Main function to clean keys
export function cleanKeys(characterObject) {
  checkAllowedKeys(characterObject);
  removeSpecialCharactersFromKeys(characterObject);
  convertMisspelledKeys(characterObject);
  removeUnwantedKeys(characterObject);
  addMissingKeys(characterObject);

  return characterObject;
}

// Check if all keys are allowed keys
function checkAllowedKeys(characterObject) {
  for (const key in characterObject) {
    if (!allowedKeys.includes(key)) {
      console.log(`cleanKeys: key: ${key} is not allowed`);
      break;
    }
  }
}

// Remove spaces, underscores and numbers from keys
function removeSpecialCharactersFromKeys(characterObject) {
  for (const key in characterObject) {
    if (/\s|_|[0-9]/.test(key)) {
      const newKey = key.replace(/\s|_|[0-9]/g, "");
      characterObject[newKey] = characterObject[key];
      console.log(`cleanKeys: key: ${key} has been changed to ${newKey}`);
      delete characterObject[key];
    }
  }
}

// Convert mispelled keys to allowed keys
function convertMisspelledKeys(characterObject) {
  for (const key in characterObject) {
    const lowercaseKey = key.toLowerCase();
    const matchingKey = allowedKeys.find((allowedKey) => allowedKey.toLowerCase() === lowercaseKey);
    if (matchingKey && key !== matchingKey) {
      characterObject[matchingKey] = characterObject[key];
      console.log(`cleanKeys: key: ${key} has been changed to ${matchingKey}`);
      delete characterObject[key];
    }
  }
}

// Remove unwanted keys
function removeUnwantedKeys(characterObject) {
  for (let key in characterObject) {
    if (!allowedKeys.includes(key)) {
      console.log(`cleanKeys: key: ${key} is not allowed and will be removed`);
      delete characterObject[key];
    }
  }
}

// Add missing keys with null value
function addMissingKeys(characterObject) {
  for (const key of allowedKeys) {
    if (!characterObject.hasOwnProperty(key)) {
      console.log(`cleanKeys: key: ${key} is missing and will be added with null value on the character: ${characterObject.name}`);
      characterObject[key] = null;
    }
  }
}


