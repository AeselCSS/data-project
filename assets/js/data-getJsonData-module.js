export async function getJsonData(url) {
  console.log("getJsonData: fetching data from url");
  const response = await fetch(url);
  return await response.json();
}