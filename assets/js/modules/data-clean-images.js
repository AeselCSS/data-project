export function cleanImages(characterObject) {
  //   console.log("checkAndModifyImageValue: checking if image value has more than one image file extension");
  
  // Check if characterObject has an "image" property
  const hasImageProperty = characterObject.hasOwnProperty("image");

  if (!hasImageProperty) {
    console.log("checkAndModifyImageValue: characterObject does not have an image property");
  } else {
    // console.log("checkAndModifyImageValue: characterObject has an image property");
    checkAndModifyExtension(characterObject);
  }

  // check if image value starts with either http:// or https:// and if not replace it with null
  if (characterObject.image) {
    if (!characterObject.image.startsWith("http://") && !characterObject.image.startsWith("https://")) {
      console.log(`checkAndModifyImageValue: image value: ${characterObject.image} does not start with http:// or https://`);
      characterObject.image = null;
    }
  }
  return characterObject;
}

// check if the last image file extension is either "jpeg", "jpg", "png", "gif", "svg" or "webp"
function checkAndModifyExtension(characterObject) {
  const imageValue = characterObject.image;
  const lastDotIndex = imageValue.lastIndexOf(".");
  const extension = imageValue.substring(lastDotIndex + 1);
  const extensionIndex = imageValue.lastIndexOf("." + extension);

  if (
    extension.includes("jpeg") ||
    extension.includes("jpg") ||
    extension.includes("png") ||
    extension.includes("gif") ||
    extension.includes("svg") ||
    extension.includes("webp")
  ) {
    characterObject.image = imageValue.substring(0, extensionIndex + 5);
  } else {
    console.log(`${characterObject.image} does not have a valid image file extension`);
  }
  return characterObject.image;
}
