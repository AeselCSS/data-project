export function removeDuplicateObjects(array) {
  const uniqueObjects = Array.from(new Set(array.map((object) => JSON.stringify(object))));
  return uniqueObjects.map((object) => JSON.parse(object));
}