// NOTE: this function does not work as intended
// function to check if the value of the key "image" has more than one image file extension
// and if it does remove any value after the last image file extension
// else if it only contains one image file extension, remove any value after the first image file extension
export function checkAndModifyImageValue(characterObject) {
    console.log("checkAndModifyImageValue: checking if image value has more than one image file extension");
  // Check if characterObject has an "image" property
    const hasImageProperty = characterObject.hasOwnProperty("image");

  if (!hasImageProperty) {
    console.log("checkAndModifyImageValue: characterObject does not have an image property");
  } else {
    console.log("checkAndModifyImageValue: characterObject has an image property");
    const imageValue = characterObject.image;
    console.log(imageValue);
    // Check if the imageValue has more than one image file extension
    const lastDotIndex = imageValue.lastIndexOf(".");
    const extension = imageValue.substring(lastDotIndex + 1);
    console.log(`checkAndModifyImageValue: imageValue has the following extension: ${extension}`);
    // check if the first 4 characters of the extension is "jpeg" or "webp" and if so slice everything after the first 4 characters
    // if not check if the first 3 characters of the extension is "jpg", "png", "gif" or "svg" and if so slice everything after the first 3 characters.
    if (extension.includes("jpeg") || extension.includes("webp")) {
      characterObject.image = imageValue.substring(0, imageValue.indexOf("." + extension) + 5);
      console.log("image file extension is jpeg or webp");
      console.log(characterObject.image);
    } else if (extension.includes("jpg") || extension.includes("png") || extension.includes("gif") || extension.includes("svg")) {
        characterObject.image = imageValue.substring(0, imageValue.indexOf("." + extension) + 4);
        console.log("image file extension is jpg, png, gif or svg");
        console.log(characterObject.image);
    } else {
        console.log("image file extension is not supported");
        }
  }

  // check if image value starts with either http:// or https:// and if not replace it with null
  if (characterObject.image) {
    if (!characterObject.image.startsWith("http://") && !characterObject.image.startsWith("https://")) {
      characterObject.image = null;
    }
  }
  return characterObject;
}
